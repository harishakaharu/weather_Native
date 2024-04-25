import { Image, View, Text, TouchableOpacity } from "react-native";
import { weatherBasic } from "../styles/WeatherBasic.style";
import { getWeatherInterP } from "../utils/weather-utils";
import BasicClock from "./BasicClock";
import { useNavigation } from "@react-navigation/native";

export default function WeatherBasic({ info, cityVal }) {
  const currentInterP = getWeatherInterP(info.current_weather.weathercode);
  const nav = useNavigation();
  return (
    <>
      <View style={weatherBasic.clock}>
        <Text style={weatherBasic.txt}>
          <BasicClock />
        </Text>
      </View>
      <View style={weatherBasic.city}>
        <Text style={weatherBasic.txt}>{cityVal}</Text>
      </View>
      <View style={weatherBasic.interP}>
        <Text style={weatherBasic.txt}>{currentInterP.label}</Text>
      </View>
      <View style={weatherBasic.tempContainer}>
        <TouchableOpacity
          onPress={() =>
            nav.navigate("ForecastPage", { cityVal, ...info.daily })
          }
        >
          <Text style={weatherBasic.temp}>
            {Math.round(info.current_weather.temperature)}°C
          </Text>
        </TouchableOpacity>
        <Image style={weatherBasic.img} source={currentInterP.image}></Image>
      </View>
      <View>
        <Text></Text>
      </View>
    </>
  );
}
