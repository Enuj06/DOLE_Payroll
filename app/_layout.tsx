import Loader from "@/components/Loader";
import migrations from "@/drizzle/migrations";
import "@/globals.css";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import "react-native-reanimated";

const name = "DOLEPayroll";
const expoDb = openDatabaseSync(name, { useNewConnection: true });
const db = drizzle(expoDb);

const RootLayout = () => {
  useMigrations(db, migrations);
  useDrizzleStudio(expoDb);

  return (
    <Suspense fallback={<Loader />}>
      <SQLiteProvider
        databaseName={name}
        options={{ useNewConnection: true }}
        useSuspense
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="attendances" options={{ headerShown: false }} />
          <Stack.Screen name="employees" options={{ headerShown: false }} />
          <Stack.Screen name="schedules" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </Suspense>
  );
};

export default RootLayout;
