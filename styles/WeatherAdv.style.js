import { StyleSheet } from "react-native";
export const weatherAdv = StyleSheet.create({
  main: {
    flexDirection: "row",
    backgroundColor: "#0000003b",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
  },
  container: { alignSelf: "center" },
  txtLabel: { fontFamily: "Alata-Regular", color: "white", fontSize: 15 },
  txtVal: { fontFamily: "Alata-Regular", color: "white", fontSize: 20 },
});
