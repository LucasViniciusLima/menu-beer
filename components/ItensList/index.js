import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ItensList(props) {
  const navigation = useNavigation();

  return (
    <View style={styles.view}>
      <TouchableOpacity
        onPress={() => navigation.navigate("DrinkList", { ...props })}
      >
        <Image style={styles.image} source={{ uri: props.data.image }} />
        <Text style={styles.whiteText}>{props.data.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 10,
    width: 100,
  },
  whiteText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  image: {
    width: 100,
    height: 100,
  },
});
