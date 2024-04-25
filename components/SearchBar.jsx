import { TextInput, View } from "react-native";
import { searchBarStyle } from "../styles/SearchBar.style";

export default function SearchBar({ onSubmit }) {
  return (
    <View>
      <TextInput
        onSubmitEditing={(e) => {
          onSubmit(e.nativeEvent.text);
        }}
        style={searchBarStyle.txt}
        placeholder="Type a city... e.g. Lucknow"
      ></TextInput>
    </View>
  );
}
