import { StyleSheet } from "react-native";
export const weatherBasic = StyleSheet.create({
  clock: { alignItems: "flex-end" },
  city: {},
  interP: { alignSelf: "flex-end", transform: [{ rotate: "-90deg" }] },
  img: {
    width: 50,
    height: 50,
  },
  temp: { fontFamily: "Alata-Regular", color: "white", fontSize: 80 },
  tempContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  txt: { fontFamily: "Alata-Regular", color: "white", fontSize: 20 },
});
