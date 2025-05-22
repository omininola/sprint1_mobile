import { Filial } from "@/libs/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type FiliaisContextType = {
  filiais: Filial[];
  setFiliais: React.Dispatch<React.SetStateAction<Filial[]>>;
};

const FiliaisContext = createContext<FiliaisContextType | undefined>(undefined);

export const useFiliais = () => {
  const context = useContext(FiliaisContext);
  if (!context) throw new Error("useFiliais deve ser usado com FiliaisProvider");
  return context;
};

export const FiliaisProvider = ({ children }: { children: ReactNode }) => {
  const [filiais, setFiliais] = useState<Filial[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const storedFiliais = await AsyncStorage.getItem("FILIAIS");

        if (storedFiliais) {
          setFiliais(JSON.parse(storedFiliais));
        }
      } catch (err) {
        console.error(
          "[ERROR] Erro ao tentar buscar filiais do AsyncStorage: ",
          err,
        );
      }
    }

    fetchData();
  }, []);

  return (
    <FiliaisContext.Provider value={{ filiais, setFiliais }}>
      {children}
    </FiliaisContext.Provider>
  );
};
