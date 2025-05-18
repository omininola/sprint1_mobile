import { StyleSheet, Text, View } from "react-native";

import { Filial } from "@/libs/types";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

export default function FilialCard({
  filial,
  onDelete,
}: {
  filial: Filial;
  onDelete: (id: number) => void;
}) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.infos}>ID: {filial.id_filial}</Text>
        <Text style={styles.infos}>Nome: {filial.nome}</Text>
        <Text style={styles.infos}>Endereco: {filial.endereco}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => router.navigate(`./filiais/${filial.id_filial}/edit`)}
          theme="secondary"
        />

        <Button
          title="Deletar"
          onPress={() => filial.id_filial && onDelete(filial.id_filial)}
          theme="danger"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 16,
  },
  infos: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
  },
  actions: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 12,
    gap: 16,
  },
});
