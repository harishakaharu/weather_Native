import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Device from "expo-device";
import { useFonts } from "expo-font";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useHttp from "./api/weatherAPI";
import backgroundImg from "./assets/background.png";
import ForecastPage from "./components/ForecastPage";
import Home from "./components/Home";
import { appStyle } from "./styles/App.style";
import Constants from "expo-constants";
const Stack = createNativeStackNavigator();
const navTheme = {
  colors: {
    background: "transparent",
  },
};
export default function App() {
  const [userLocation, setUserLocation] = useState();
  let { error, fetchWeather, fetchCity, fetchSearchCoords } = useHttp();
  const [weatherInfo, setWeatherInfo] = useState();
  const [cityVal, setCityVal] = useState();
  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  });
  useEffect(() => {
    if (error === "Invalid City Name") {
      Alert.alert(error);
    }
  }, [error]);
  useEffect(() => {
    getUserCoords();
  }, []);
  const getUserCoords = async () => {
    subscribeToNotification();

    //App is running in background or killed when notification is triggered.
    Notifications.addNotificationResponseReceivedListener((response) =>
      console.log(response.notification.request.content)
    );
    //App is running
    Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const userCoords = await getCurrentPositionAsync();
      setUserLocation({
        lat: userCoords.coords.latitude,
        lng: userCoords.coords.longitude,
      });
    } else {
      setUserLocation({ lat: "26.85", lng: "80.35" });
    }
  };

  //###################Send Notification############################

  const subscribeToNotification = async () => {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
          // "d8a92c90-31fc-45ab-a23f-55ab6e4d4a4f",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  };

  //######################Custom hook call##########################
  useEffect(() => {
    const dataTransform = (data) => {
      setWeatherInfo(data);
    };
    const cityHandler = (data) => {
      const {
        address: { city, village, town },
      } = data;
      setCityVal(city || village || town);
    };
    fetchWeather(userLocation, dataTransform);
    fetchCity(userLocation, cityHandler);
  }, [fetchWeather, userLocation]);
  const fetchCoordsHandler = (text) => {
    const coordsHandler = (data) => {
      const { latitude, longitude } = data;
      setUserLocation({ lat: latitude, lng: longitude });
    };
    fetchSearchCoords(text, coordsHandler);
  };
  return (
    <NavigationContainer theme={navTheme}>
      <ImageBackground
        source={backgroundImg}
        imageStyle={appStyle.imgStyle}
        style={appStyle.backImg}
      >
        <SafeAreaProvider>
          <SafeAreaView style={appStyle.main}>
            {isFontLoaded && weatherInfo && (
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false, animation: "fade" }}
              >
                <Stack.Screen name="Home">
                  {() => (
                    <Home
                      weatherInfo={weatherInfo}
                      cityVal={cityVal}
                      onSubmit={fetchCoordsHandler}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="ForecastPage" component={ForecastPage} />
              </Stack.Navigator>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
