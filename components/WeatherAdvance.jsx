import { Text, View } from "react-native";
import { weatherAdv } from "../styles/WeatherAdv.style";

export default function WeatherAdvance({ windspeed, sunrise, sunset }) {
  return (
    <>
      <View style={weatherAdv.main}>
        <View style={weatherAdv.container}>
          <Text style={weatherAdv.txtLabel}>Sunrise</Text>
          <Text style={weatherAdv.txtVal}>{sunrise.split("T")[1]}</Text>
        </View>
        <View style={weatherAdv.container}>
          <Text style={weatherAdv.txtLabel}>Sunset</Text>
          <Text style={weatherAdv.txtVal}>{sunset.split("T")[1]}</Text>
        </View>
        <View style={weatherAdv.container}>
          <Text style={weatherAdv.txtLabel}>Windspeed</Text>
          <Text style={weatherAdv.txtVal}>{windspeed} km/h</Text>
        </View>
      </View>
    </>
  );
}
