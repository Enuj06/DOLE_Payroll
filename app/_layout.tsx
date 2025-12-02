import Loader from "@/components/Loader";
import migrations from "@/drizzle/migrations";
import "@/globals.css";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Stack } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import Toast, {
  BaseToastProps,
  ErrorToast,
  SuccessToast,
} from "react-native-toast-message";

const name = "DOLEPayroll";
const expoDb = openDatabaseSync(name, { useNewConnection: true });
const db = drizzle(expoDb);

const toastConfig = {
  success: (props: BaseToastProps) => (
    <SuccessToast
      {...props}
      text1Style={{ fontSize: 14, textAlign: "center" }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast {...props} text1Style={{ fontSize: 14, textAlign: "center" }} />
  ),
};

const RootLayout = () => {
  useMigrations(db, migrations);
  useDrizzleStudio(expoDb);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <SQLiteProvider
          databaseName={name}
          options={{ useNewConnection: true }}
          useSuspense
        >
          <Stack>
            <Stack.Screen name="employees" options={{ headerShown: false }} />
          </Stack>
        </SQLiteProvider>
      </Suspense>

      <Toast config={toastConfig} />
    </>
  );
};

export default RootLayout;
