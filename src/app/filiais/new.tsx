import FilialForm from "@/components/FilialForm";
import Title from "@/components/Title";
import { useFiliais } from "@/contexts/FiliaisContext";
import { Filial } from "@/libs/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function NewMoto() {
  const router = useRouter();

  const { filiais, setFiliais } = useFiliais();

  function handleSubmit({ nome, endereco }: Filial) {
    let new_id = 1;
    if (filiais.length !== 0) {
      const maxMoto = filiais.reduce((prev, current) => {
        if (current.id_filial === undefined || prev.id_filial === undefined)
          return prev;
        return current.id_filial > prev.id_filial ? current : prev;
      }, filiais[0]);

      if (maxMoto.id_filial === undefined) return;
      new_id = maxMoto.id_filial + 1;
    }

    const newFilial: Filial = {
      id_filial: new_id,
      nome,
      endereco,
    };

    setFiliais((prev) => [...prev, newFilial]);

    try {
      AsyncStorage.setItem("FILIAIS", JSON.stringify([...filiais, newFilial]));
    } catch (err) {
      console.error(
        "[ERROR] Error inserting new Filial on AsyncStorage: ",
        err,
      );
    }

    router.push("/");
  }

  return (
    <View>
      <Title text="Crie uma nova Filial" />
      <FilialForm onSubmit={handleSubmit} />
    </View>
  );
}
