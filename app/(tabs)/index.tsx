import PayslipModal from "@/components/Modals/PayslipModal";
import EmployeesTable from "@/components/Tables/EmployeesTable";
import { Employee } from "@/types/globals";
import { calculate, formatNumber } from "@/utils/globals";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImmer } from "use-immer";

const data = [
  {
    id: 1,
    last_name: "Santos",
    first_name: "Maria",
    position: "Cashier",
    rate: 120,
    hours: 160,
  },
  {
    id: 2,
    last_name: "Dela Cruz",
    first_name: "Juan",
    position: "Store Manager",
    rate: 200,
    hours: 168,
  },
  {
    id: 3,
    last_name: "Reyes",
    first_name: "Ana",
    position: "Stock Associate",
    rate: 100,
    hours: 150,
  },
  {
    id: 4,
    last_name: "Tan",
    first_name: "Mark",
    position: "Delivery",
    rate: 110,
    hours: 140,
  },
];

const PayrollPage = () => {
  const [employees] = useImmer(data);
  const [selectedEmployee, setSelectedEmployee] = useImmer<Employee | null>(
    null
  );

  const calculateTotals = () => {
    const total = { gross: 0, deductions: 0, net: 0 };

    employees.forEach((employee) => {
      const pay = calculate(employee);
      total.gross += pay.gross;
      total.deductions += pay.deductions;
      total.net += pay.net;
    });

    return total;
  };

  const totals = calculateTotals();

  const handleEmployeeChange = (employee: Employee | null) => {
    setSelectedEmployee(employee);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4 items-center">
      <View className="w-full flex-row justify-between items-center mb-3 mt-5">
        <View className="flex-row items-center">
          <FontAwesome5 name="file-invoice" size={22} />
          <Text className="text-xl font-bold ml-2"> Payroll Dashboard</Text>
        </View>

        <TouchableOpacity
          className="flex-row items-center gap-1 p-2"
          onPress={() => {}}
        >
          <MaterialIcons name="download" size={20} />
          <Text className="ml-1.5 font-semibold">Export</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full flex-row p-3 bg-white rounded-xl justify-between mb-3">
        <View>
          <Text className="text-[#666] text-sm">Total Gross</Text>

          <Text className="text-lg font-bold mt-1.5">{`₱${formatNumber(totals.gross)}`}</Text>
        </View>

        <View>
          <Text className="text-[#666] text-sm">Total Deductions</Text>

          <Text className="text-lg font-bold mt-1.5">{`₱${formatNumber(totals.deductions)}`}</Text>
        </View>

        <View>
          <Text className="text-[#666] text-sm">Total Net</Text>

          <Text className="text-lg font-bold mt-1.5">{`₱${formatNumber(totals.net)}`}</Text>
        </View>
      </View>

      <EmployeesTable employees={employees} onPress={handleEmployeeChange} />

      <PayslipModal
        employee={selectedEmployee}
        onClose={handleEmployeeChange}
      />
    </SafeAreaView>
  );
};

export default PayrollPage;
