import { View } from "react-native";
import { homeStyle } from "../styles/Home.style";
import WeatherBasic from "./WeatherBasic";
import WeatherAdvance from "./WeatherAdvance";
import SearchBar from "./SearchBar";

export default function Home({ weatherInfo, cityVal, onSubmit }) {
  const currentWeather = weatherInfo.current_weather;
  return (
    <>
      <View style={homeStyle.basic}>
        <WeatherBasic info={weatherInfo} cityVal={cityVal} />
      </View>
      <View style={homeStyle.searchbar}>
        <SearchBar onSubmit={onSubmit} />
      </View>
      <View style={homeStyle.advance}>
        <WeatherAdvance
          windspeed={currentWeather.windspeed}
          sunrise={weatherInfo.daily.sunrise[0]}
          sunset={weatherInfo.daily.sunset[0]}
        />
      </View>
    </>
  );
}
