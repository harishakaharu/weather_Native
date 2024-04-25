import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { forecastStyle } from "../styles/Forecast.style";
import Header from "./Header";
import ForecastCard from "./ForecastCard";
import { getDay, getWeatherInterP } from "../utils/weather-utils";

export default function ForecastPage() {
  const { params } = useRoute();
  return (
    <>
      <View>
        <Header city={params.cityVal} />
      </View>
      <View style={forecastStyle.container}>
        {params.time.map((data, index) => {
          const weatherCode = params.weathercode[index];
          const image = getWeatherInterP(weatherCode).image;
          const temp = params.temperature_2m_max[index];
          const date = new Date(data);
          const day = getDay[date.getDay()];
          return (
            <ForecastCard
              key={data}
              image={image}
              day={day}
              date={data.substring(5)}
              temp={temp.toFixed(0)}
            />
          );
        })}
      </View>
    </>
  );
}
