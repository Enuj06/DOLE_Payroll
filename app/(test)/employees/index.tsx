import DeleteAlert from "@/components/DeleteAlert";
import useDelete from "@/hooks/employees/useDelete";
import useFetchAll from "@/hooks/employees/useFetchAll";
import { getDb } from "@/utils/globals";
import { Href, useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback } from "react";
import {
  BackHandler,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { employees, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        router.navigate("/");
        return true;
      };

      const backhandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => backhandler.remove();
    }, [router])
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Employees</Text>

        <TouchableOpacity
          onPress={() => router.navigate("employees/add" as Href)}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <FlatList
          data={employees}
          keyExtractor={(employee) => `${employee.id}`}
          renderItem={({ item: employee }) => (
            <View className="flex-row gap-4">
              <View>
                <Text>{`${employee.last_name}, ${employee.first_name} ${employee.middle_initial}.`}</Text>
              </View>

              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() =>
                    router.navigate({
                      pathname: "/employees/edit/[id]",
                      params: { id: employee.id },
                    })
                  }
                >
                  <Text>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    DeleteAlert(employee.id, "Employee", handleDelete);
                  }}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default IndexPage;
