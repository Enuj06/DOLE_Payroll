import Loader from "@/components/Loader";
import Table from "@/components/Table";
import useFetchAll from "@/hooks/employees/useFetchAll";
import { Attendance, Employee } from "@/types/globals";
import { formatNumber, getDb } from "@/utils/globals";
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

  const columns = [
    {
      key: "employee_id",
      header: "Employee ID",
      width: 6,
      render: (row: Employee) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${`${row.employee_id}`}`}</Text>
      ),
    },
    {
      key: "name",
      header: "Name",
      width: 9,
      render: (row: Employee) => (
        <Text className="text-sm text-center text-[#3C492C]">
          {`${row.last_name}, ${row.first_name} ${row.middle_initial}.`}`
        </Text>
      ),
    },
    {
      key: "rate",
      header: "Rate",
      width: 7,
      render: (row: Employee) => (
        <Text className="text-sm text-center text-[#3C492C]">{`Php${formatNumber(row.rate)}`}</Text>
      ),
    },
  ];

  if (!employees || !filteredEmployees) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text>Payroll</Text>

      <View className="mt-4">
        <Table columns={columns} rows={filteredEmployees} />
      </View>
    </SafeAreaView>
  );
};

export default PayrollPage;
