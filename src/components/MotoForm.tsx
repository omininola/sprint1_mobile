import Button from "@/components/Button";
import { useFiliais } from "@/contexts/FiliaisContext";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function MotoForm({
  initialValues,
  onSubmit,
}: {
  initialValues?: {
    placa: string;
    modelo: string;
    filialId: number;
  };
  onSubmit: ({
    placa,
    modelo,
    filialId,
  }: {
    placa: string;
    modelo: string;
    filialId: number;
  }) => void;
}) {
  const [placa, setPlaca] = useState<string>(initialValues?.placa || "");
  const [modelo, setModelo] = useState<string>(initialValues?.modelo || "");
  const [filialId, setFilialId] = useState<number>(
    initialValues?.filialId || -1,
  );

  const { filiais } = useFiliais();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Placa"
        value={placa}
        onChangeText={setPlaca}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <Picker
        selectedValue={filialId}
        style={styles.input}
        onValueChange={(itemValue: number) => {
          setFilialId(itemValue);
        }}
      >
        <Picker.Item label="Selecione a Filial" value={-1} />
        {filiais.map((f) => (
          <Picker.Item key={f.id_filial} label={f.nome} value={f.id_filial} />
        ))}
      </Picker>

      <Button
        title="Salvar"
        onPress={() => onSubmit({ placa, modelo, filialId })}
      />
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
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
