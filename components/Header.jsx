import { Text, View, TouchableOpacity } from "react-native";
import { headerStyle } from "../styles/Header.style";
import { useNavigation } from "@react-navigation/native";

export default function Header({ city }) {
  const nav = useNavigation();
  return (
    <>
      <View style={headerStyle.main}>
        <TouchableOpacity
          onPress={nav.goBack}
          style={{ justifyContent: "center" }}
        >
          <Text style={headerStyle.txt}>{"<"}</Text>
        </TouchableOpacity>

        <View style={headerStyle.container}>
          <Text style={headerStyle.txt}>{city.toUpperCase()}</Text>
          <Text style={headerStyle.descTxt}>7 days Forecast</Text>
        </View>
      </View>
    </>
  );
}
