import Button from "@/components/Button";
import FilialCard from "@/components/FilialCard";
import MotoCard from "@/components/MotoCard";
import { useFiliais } from "@/contexts/FiliaisContext";
import { useMotos } from "@/contexts/MotosContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const { motos, setMotos } = useMotos();
  const { filiais, setFiliais } = useFiliais();

  const handleDeleteMotos = async (id: number) => {
    setMotos((prevMotos) => {
      const newMotos = prevMotos.filter((moto) => moto.id_moto !== id);
      AsyncStorage.setItem("MOTOS", JSON.stringify(newMotos));
      return newMotos;
    });
  };

  const handleDeleteFiliais = async (id: number) => {
    setFiliais((prevFiliais) => {
      const newFiliais = prevFiliais.filter(
        (filial) => filial.id_filial !== id,
      );
      AsyncStorage.setItem("FILIAIS", JSON.stringify(newFiliais));
      return newFiliais;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lista de Filiais</Text>
          <Button
            title="Criar Nova Filial"
            onPress={() => router.navigate("./filiais/new")}
          />
        </View>

        <View style={styles.cardsContainer}>
          {filiais.map((filial) => (
            <FilialCard
              key={filial.id_filial}
              filial={filial}
              onDelete={handleDeleteFiliais}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lista de Motos</Text>
          <Button
            title="Criar Nova Moto"
            onPress={() => router.navigate("./motos/new")}
          />
        </View>

        <View style={styles.cardsContainer}>
          {motos.map((moto) => (
            <MotoCard
              key={moto.id_moto}
              moto={moto}
              onDelete={handleDeleteMotos}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8d8d8d",
    padding: 16,
  },
  section: {
    marginBottom: 32,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardsContainer: {
    gap: 12,
  },
});
