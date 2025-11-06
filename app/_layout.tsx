import Loader from "@/components/Loader";
import "@/globals.css";
import { Stack } from "expo-router";
import { Suspense } from "react";
import "react-native-reanimated";

const RootLayout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Suspense>
  );
};

export default RootLayout;
