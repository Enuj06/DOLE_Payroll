import useFetch from "@/hooks/employees/useFetch";
import { getDb } from "@/utils/globals";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmployeesPage = () => {
  const db = getDb();
  const router = useRouter();

  const { employees } = useFetch(db);
  console.log(employees);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text>Employees</Text>

      <TouchableOpacity onPress={() => router.push("employees/add" as Href)}>
        <Text>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EmployeesPage;
