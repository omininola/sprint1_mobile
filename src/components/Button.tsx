import { Pressable, StyleSheet, Text } from "react-native";

const colors = {
  primary: "#007bff",
  secondary: "#6c757d",
  danger: "#dc3545",
};

export default function Button({
  title,
  onPress,
  theme = "primary",
}: {
  title: string;
  onPress: () => void;
  theme?: "primary" | "secondary" | "danger";
}) {
  const buttonStyles = {
    backgroundColor: colors[theme],
  };

  return (
    <Pressable style={[styles.button, buttonStyles]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
