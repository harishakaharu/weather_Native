import { StyleSheet } from "react-native";
export const forecastStyleC = StyleSheet.create({
  main: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: { width: 50, height: 50 },
  txt: { fontFamily: "Alata-Regular", color: "white", fontSize: 30 },
  tmpTxt: {
    fontFamily: "Alata-Regular",
    color: "white",
    fontSize: 30,
    minWidth: 100,
    alignSelf: "center",
    textAlign: "center",
  },
});
