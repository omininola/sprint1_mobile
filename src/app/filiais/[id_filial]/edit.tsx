import FilialForm from "@/components/FilialForm";
import Title from "@/components/Title";
import { useFiliais } from "@/contexts/FiliaisContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EditFilial() {
  const router = useRouter();
  const { id_filial } = useLocalSearchParams<{ id_filial: string }>();
  const { filiais, setFiliais } = useFiliais();

  const [initialValues, setInitialValues] = useState<{
    nome: string;
    endereco: string;
  } | null>(null);

  useEffect(() => {
    if (!id_filial) return;
    const filial = filiais.find((f) => f.id_filial === Number(id_filial));
    if (filial) {
      setInitialValues({
        nome: filial.nome,
        endereco: filial.endereco,
      });
    }
  }, [id_filial, filiais]);

  function handleSubmit({
    nome,
    endereco,
  }: {
    nome: string;
    endereco: string;
  }) {
    const updatedFiliais = filiais.map((filial) =>
      filial.id_filial === Number(id_filial)
        ? { ...filial, nome, endereco }
        : filial,
    );

    setFiliais(updatedFiliais);

    try {
      AsyncStorage.setItem("FILIAIS", JSON.stringify(updatedFiliais));
    } catch (err) {
      console.error("[ERROR] Error updating Filial on AsyncStorage: ", err);
    }

    router.push("/");
  }

  if (!initialValues) {
    return (
      <View style={styles.loading}>
        <Text>Carregando filial...</Text>
      </View>
    );
  }

  return (
    <View>
      <Title text={`Editando Filial ${id_filial}`} />
      <FilialForm onSubmit={handleSubmit} initialValues={initialValues} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
});
