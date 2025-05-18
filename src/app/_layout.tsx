import { FiliaisProvider } from "@/contexts/FiliaisContext";
import { MotosProvider } from "@/contexts/MotosContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <MotosProvider>
      <FiliaisProvider>
        <Stack screenOptions={{ title: "Gerenciador da Mottu" }} />
      </FiliaisProvider>
    </MotosProvider>
  );
}
