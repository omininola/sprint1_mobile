import { StyleSheet, Text } from "react-native";

export default function Title({ text }: { text: string }) {
  return <Text style={styles.title}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 24,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
