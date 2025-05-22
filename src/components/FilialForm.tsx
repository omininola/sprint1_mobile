import Button from "@/components/Button";
import { Filial } from "@/libs/types";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function MotoForm({
  initialValues,
  onSubmit,
}: {
  initialValues?: Filial;
  onSubmit: ({ nome, endereco }: Filial) => void;
}) {
  const [nome, setNome] = useState(initialValues?.nome || "");
  const [endereco, setEndereco] = useState(initialValues?.endereco || "");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereco"
        value={endereco}
        onChangeText={setEndereco}
      />

      <Button title="Salvar" onPress={() => onSubmit({ nome, endereco })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
});
