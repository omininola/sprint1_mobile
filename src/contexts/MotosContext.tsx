import { Moto } from "@/libs/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type MotosContextType = {
  motos: Moto[];
  setMotos: React.Dispatch<React.SetStateAction<Moto[]>>;
};

const MotosContext = createContext<MotosContextType | undefined>(undefined);

export const useMotos = () => {
  const context = useContext(MotosContext);
  if (!context) throw new Error("useMotos deve ser usado com MotosProvider");
  return context;
};

export const MotosProvider = ({ children }: { children: ReactNode }) => {
  const [motos, setMotos] = useState<Moto[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storedMotos = await AsyncStorage.getItem("MOTOS");

        if (storedMotos) {
          setMotos(JSON.parse(storedMotos));
        }
      } catch (err) {
        console.error(
          "[ERROR] Erro ao tentar buscar motos do AsyncStorage: ",
          err,
        );
      }
    }

    fetchData();
  }, []);

  return (
    <MotosContext.Provider value={{ motos, setMotos }}>
      {children}
    </MotosContext.Provider>
  );
};
