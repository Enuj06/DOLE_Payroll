import DeleteAlert from "@/components/DeleteAlert";
import Loader from "@/components/Loader";
import useDelete from "@/hooks/employees/useDelete";
import useFetchAll from "@/hooks/employees/useFetchAll";
import { Employee } from "@/types/globals";
import { formatNumber, formatTime, getDb } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmployeesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { employees, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

  if (!employees) return <Loader />;

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb]">
      <View className="px-4 pt-4 pb-3">
        <Text className="text-3xl font-extrabold text-[#3C492C] mb-4">Employees</Text>
        <TouchableOpacity
          onPress={() => router.push("/employees/add")}
          className="bg-[#3c6ebd] rounded-2xl py-3 px-4 flex-row items-center justify-center gap-2 shadow-md"
        >
          <MaterialIcons name="add" size={22} color="white" />
          <Text className="text-white font-semibold text-base">Add Employee</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4">
        {employees.map((employee: Employee) => (
          <View
            key={employee.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200"
          >
            <View className="flex-row justify-between mb-2">
              <View className="flex-1 items-center">
                <Text className="text-sm text-gray-500">Employee ID</Text>
                <Text className="text-[#3C492C] font-semibold">{employee.employee_id}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-gray-500">Position</Text>
                <Text className="text-[#3C492C] font-semibold">{employee.position}</Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-2">
                            <View className="flex-1 items-center">
                <Text className="text-sm text-gray-500">Name</Text>
                <Text className="text-[#3C492C] font-semibold text-center">
                  {`${employee.last_name}, ${employee.first_name} ${employee.middle_initial}.`}
                </Text>
              </View>

              <View className="flex-1 items-center">
                <Text className="text-sm text-gray-500">Rate</Text>
                <Text className="text-[#3C492C] font-semibold">Php{formatNumber(employee.rate)}</Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-2">
              <View className="flex-1 items-center">
                <Text className="text-sm text-gray-500">Schedule</Text>
                <Text className="text-[#3C492C] font-semibold text-center">
                  {employee.schedule
                    ? `${formatTime(employee.schedule.am_in)} - ${formatTime(employee.schedule.am_out)} / ${formatTime(employee.schedule.pm_in)} - ${formatTime(employee.schedule.pm_out)}`
                    : "-"}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-center gap-4 mt-1">
              <TouchableOpacity
                onPress={() => router.push(`/employees/edit/${employee.id}`)}
                className="p-2 bg-[#3c6ebd] rounded-lg"
              >
                <MaterialIcons name="edit" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => DeleteAlert(employee.id, "Employee", handleDelete)}
                className="p-2 bg-[#E53935] rounded-lg"
              >
                <MaterialIcons name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmployeesPage;
