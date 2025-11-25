import Loader from "@/components/Loader";
import PeriodModal from "@/components/PeriodModal";
import Table from "@/components/Table";
import useFetchAll from "@/hooks/employees/useFetchAll";
import { period as schema, Period as Values } from "@/schemas/globals";
import { Attendance, Employee } from "@/types/globals";
import {
  formatNumber,
  getDate,
  getDb,
  getGross,
  getPeriodHours,
} from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { lastDayOfMonth } from "date-fns";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImmer } from "use-immer";

const PayrollPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();
  const form = useForm({ resolver: yupResolver(schema) });

  const getPeriod = () => {
    const today = new Date();
    let start = new Date();
    let end = new Date();

    start.setDate(1);
    end.setDate(15);

    if (today.getDate() > 15) {
      const last = lastDayOfMonth(today);
      start.setDate(16);
      end.setDate(last.getDate());
    }
    return { start, end };
  };

  const [period, setPeriod] = useImmer<{
    start: Date;
    end: Date;
  }>({
    start: getPeriod().start,
    end: getPeriod().end,
  });
  const [isPeriodModalVisible, setIsPeriodModalVisible] = useImmer(false);

  const { employees } = useFetchAll(db);

  const filteredEmployees = useMemo(() => {
    if (employees) {
      const start = new Date(getDate(period.start));
      const end = new Date(getDate(period.end));

      return employees.map((employee) => {
        let attendances: Attendance[] = [];

        if (employee.attendances) {
          attendances = employee.attendances.filter((attendance) => {
            const date = new Date(getDate(attendance.date));
            return (
              date.valueOf() >= start.valueOf() &&
              date.valueOf() <= end.valueOf()
            );
          });
        }
        return { ...employee, attendances };
      });
    }
  }, [period, employees]);

  const handlePeriodModalToggle = (isVisible: boolean) => {
    setIsPeriodModalVisible(isVisible);
  };

  const handlePeriodModalSubmit = async (values: Values) => {
    setPeriod({ start: new Date(values.start), end: new Date(values.end) });
    setIsPeriodModalVisible(false);
  };

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
      width: 10,
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
    {
      key: "hours",
      header: "Total Hours",
      width: 7,
      render: (row: Employee) => {
        const hours =
          row.schedule && row.attendances
            ? getPeriodHours(row.schedule, row.attendances)
            : 0;
        return (
          <Text className="text-sm text-center text-[#3C492C]">{`${formatNumber(hours)} Hours`}</Text>
        );
      },
    },
    {
      key: "gross",
      header: "Gross Income",
      width: 7,
      render: (row: Employee) => {
        const gross =
          row.schedule && row.attendances
            ? getGross(row.schedule, row.attendances, row.rate)
            : 0;
        return (
          <Text className="text-sm text-center text-[#3C492C]">{`Php${formatNumber(gross)}`}</Text>
        );
      },
    },
    {
      key: "deductions",
      header: "Deductions",
      width: 7,
      render: (row: Employee) => (
        <Text className="text-sm text-center text-[#3C492C]">{`Php${formatNumber(0)}`}</Text>
      ),
    },
    {
      key: "net",
      header: "Net Income",
      width: 7,
      render: (row: Employee) => {
        const gross =
          row.schedule && row.attendances
            ? getGross(row.schedule, row.attendances, row.rate)
            : 0;
        return (
          <Text className="text-sm text-center text-[#3C492C]">{`Php${formatNumber(gross)}`}</Text>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      width: 9,
      render: (row: Employee) => (
        <View className="flex-row gap-4 justify-center">
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "/payroll/view/[filters]",
                params: {
                  filters: `id=${row.id}&start=${period.start.toISOString()}&end=${period.end.toISOString()}`,
                },
              })
            }
          >
            <MaterialIcons name="remove-red-eye" size={20} color="#2196F3" />
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  if (!employees || !filteredEmployees) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Payroll</Text>

        <PeriodModal
          form={form}
          isVisible={isPeriodModalVisible}
          onToggle={handlePeriodModalToggle}
          onSubmit={handlePeriodModalSubmit}
        />
      </View>

      <View className="mt-4">
        <Table columns={columns} rows={filteredEmployees} />
      </View>
    </SafeAreaView>
  );
};

export default PayrollPage;
