import MotoForm from "@/components/MotoForm";
import Title from "@/components/Title";
import { useFiliais } from "@/contexts/FiliaisContext";
import { useMotos } from "@/contexts/MotosContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EditMoto() {
  const router = useRouter();
  const { id_moto } = useLocalSearchParams<{ id_moto: string }>();
  const { motos, setMotos } = useMotos();
  const { filiais } = useFiliais();

  const [initialValues, setInitialValues] = useState<{
    placa: string;
    modelo: string;
    filialId: number;
  } | null>(null);

  useEffect(() => {
    if (!id_moto) return;
    const moto = motos.find((m) => m.id_moto === Number(id_moto));
    if (moto) {
      setInitialValues({
        placa: moto.placa,
        modelo: moto.modelo,
        filialId: moto.filial?.id_filial ?? -1,
      });
    }
  }, [id_moto, motos]);

  function handleSubmit({
    placa,
    modelo,
    filialId,
  }: {
    placa: string;
    modelo: string;
    filialId: number;
  }) {
    const selectedFilial = filiais.find((f) => f.id_filial === filialId);

    const updatedMotos = motos.map((moto) =>
      moto.id_moto === Number(id_moto)
        ? { ...moto, placa, modelo, filial: selectedFilial }
        : moto,
    );

    setMotos(updatedMotos);

    try {
      AsyncStorage.setItem("MOTOS", JSON.stringify(updatedMotos));
    } catch (err) {
      console.error("[ERROR] Error updating Moto on AsyncStorage: ", err);
    }

    router.push("/");
  }

  if (!initialValues) {
    return (
      <View style={styles.loading}>
        <Text>Carregando moto...</Text>
      </View>
    );
  }

  return (
    <View>
      <Title text={`Editando Moto ${id_moto}`} />
      <MotoForm onSubmit={handleSubmit} initialValues={initialValues} />
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
