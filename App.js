import { appStyle } from "./styles/App.style";
import { Alert, ImageBackground, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "./components/Home";
import backgroundImg from "./assets/background.png";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useHttp from "./api/weatherAPI";
import ForecastPage from "./components/ForecastPage";
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
