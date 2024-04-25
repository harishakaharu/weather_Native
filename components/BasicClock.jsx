import { Text, View } from "react-native";
import { basicStyle } from "../styles/BasicClock.style";
import { timeFormat } from "../utils/time-utils";
import { useEffect, useState } from "react";
export default function BasicClock() {
  const [timeVal, setTimeVal] = useState();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeVal(timeFormat());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <View style={basicStyle.main}>
        <Text style={basicStyle.txt}>{timeVal}</Text>
      </View>
    </>
  );
}
