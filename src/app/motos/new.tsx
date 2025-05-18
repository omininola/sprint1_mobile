import MotoForm from "@/components/MotoForm";
import Title from "@/components/Title";
import { useFiliais } from "@/contexts/FiliaisContext";
import { useMotos } from "@/contexts/MotosContext";
import { Moto } from "@/libs/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function NewMoto() {
  const router = useRouter();

  const { motos, setMotos } = useMotos();
  const { filiais } = useFiliais();

  function handleSubmit({
    placa,
    modelo,
    filialId,
  }: {
    placa: string;
    modelo: string;
    filialId: number;
  }) {
    let new_id = 1;
    if (motos.length !== 0) {
      const maxMoto = motos.reduce((prev, current) => {
        if (current.id_moto === undefined || prev.id_moto === undefined)
          return prev;
        return current.id_moto > prev.id_moto ? current : prev;
      }, motos[0]);

      if (maxMoto.id_moto === undefined) return;
      new_id = maxMoto.id_moto + 1;
    }

    const selectedFilial = filiais.find((f) => f.id_filial == filialId);

    const newMoto: Moto = {
      id_moto: new_id,
      placa,
      modelo,
      filial: selectedFilial,
    };

    setMotos((prev) => [...prev, newMoto]);

    try {
      AsyncStorage.setItem("MOTOS", JSON.stringify([...motos, newMoto]));
    } catch (err) {
      console.error("[ERROR] Error inserting new Moto on AsyncStorage: ", err);
    }

    router.push("/");
  }

  return (
    <View>
      <Title text="Crie uma nova Moto" />
      <MotoForm onSubmit={handleSubmit} />
    </View>
  );
}
