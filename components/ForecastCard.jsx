import { Text, View, Image } from "react-native";
import { forecastStyleC } from "../styles/ForecastCard.style";

export default function ForecastCard({ image, day, date, temp }) {
  return (
    <>
      <View style={forecastStyleC.main}>
        <Image source={image} style={forecastStyleC.img} />
        <Text style={forecastStyleC.txt}>{day}</Text>
        <Text style={forecastStyleC.txt}>{date}</Text>
        <Text style={forecastStyleC.tmpTxt}>{temp}°C</Text>
      </View>
    </>
  );
}
