import { Employee } from "@/types/globals";
import { calculate, formatNumber } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useImmer } from "use-immer";

type Props = {
  employees: Employee[];
  onPress: (employee: Employee | null) => void;
};

const EmployeesTable = ({ employees, onPress }: Props) => {
  const [searchQuery, setSearchQuery] = useImmer("");

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      return a.last_name < b.last_name ? -1 : a.last_name > b.last_name ? 1 : 0;
    });
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const columns = ["last_name", "first_name", "position", "rate", "hours"];

    if (searchQuery && sortedEmployees) {
      return sortedEmployees.filter((employee) => {
        const isValid = columns.some((column) => {
          const value = employee[column as keyof Employee];
          return value
            ? `${value}`.toLowerCase().includes(searchQuery.toLowerCase())
            : false;
        });
        if (isValid) return employee;
      });
    }

    return sortedEmployees;
  }, [sortedEmployees, searchQuery]);

  return (
    <View>
      <View className="w-full flex-row items-center mb-3 gap-2">
        <View className="flex-row items-center bg-white p-2 rounded-lg flex-1 gap-2">
          <MaterialIcons name="search" size={18} />

          <TextInput
            placeholder="Search name or position"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          className="p-2.5 bg-white rounded-lg"
          onPress={() => setSearchQuery("")}
        >
          <Text className="font-semibold">Clear</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <FlatList
          data={filteredEmployees}
          keyExtractor={(employee) => `${employee.id}`}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item: employee }) => {
            const pay = calculate(employee);
            return (
              <View className="bg-white p-3 rounded-xl mb-2.5 w-full flex-row items-center justify-between">
                <View className="gap-1">
                  <Text className="text-lg font-bold">{`${employee.first_name} ${employee.last_name}`}</Text>

                  <Text className="text-[#666]">{employee.position}</Text>
                </View>

                <View>
                  <Text className="text-[#333] font-semibold">{`₱${formatNumber(pay.net)}`}</Text>

                  <TouchableOpacity
                    className="mt-2 py-1.5 px-2.5 rounded-md bg-[#eef2ff] items-center"
                    onPress={() => onPress(employee)}
                  >
                    <Text className="font-bold">Payslip</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default EmployeesTable;
