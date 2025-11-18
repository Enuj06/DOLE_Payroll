import useFetchAll from "@/hooks/employees/useFetchAll";
import { Attendance } from "@/types/globals";
import { getDb } from "@/utils/globals";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PayrollPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { employees, refetch } = useFetchAll(db);

  const getDateRange = () => {
    const today = new Date();
    if (today.getDate() > 15) {
      const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { start: today.setDate(16), end: today.setDate(last.getDate()) };
    }
    return { start: today.setDate(1), end: today.setDate(15) };
  };

  const filteredEmployees = useMemo(() => {
    if (employees) {
      return employees.map((employee) => {
        const { start, end } = getDateRange();
        let attendances: Attendance[] = [];
        if (employee.attendances) {
          attendances = employee.attendances.filter((attendance) => {
            const date = new Date(attendance.date);
            return (
              date.valueOf() >= start.valueOf() &&
              date.valueOf() <= end.valueOf()
            );
          });
        }
        return { ...employee, attendances };
      });
    }
  }, [employees]);

  console.log(filteredEmployees);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text>Payroll</Text>

      <View className="mt-4"></View>
    </SafeAreaView>
  );
};

export default PayrollPage;
