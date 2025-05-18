import { StyleSheet, Text, View } from "react-native";

import { Moto } from "@/libs/types";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

export default function MotoCard({
  moto,
  onDelete,
}: {
  moto: Moto;
  onDelete: (id: number) => void;
}) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.infos}>ID: {moto.id_moto}</Text>
        <Text style={styles.infos}>Placa: {moto.placa}</Text>
        <Text style={styles.infos}>Modelo: {moto.modelo}</Text>
        <Text style={styles.infos}>Filial: {moto.filial?.nome}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => router.navigate(`./motos/${moto.id_moto}/edit`)}
          theme="secondary"
        />

        <Button
          title="Deletar"
          onPress={() => moto.id_moto && onDelete(moto.id_moto)}
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
