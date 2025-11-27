import Loader from "@/components/Loader";
import useFetch from "@/hooks/employees/useFetch";
import { Attendance, Employee } from "@/types/globals";
import {
  formatDate,
  formatNumber,
  getDb,
  getDeductions,
  getEarnings,
  getObjectTotal,
  getParamValue,
  getPeriodHours,
  getWorkingHours,
} from "@/utils/globals";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewPage = () => {
  const { filters }: { filters: string } = useLocalSearchParams();

  const pairs = filters.split("&");
  const id = getParamValue(pairs[0]);
  const start = getParamValue(pairs[1]);
  const end = getParamValue(pairs[2]);

  const db = getDb(useSQLiteContext());

  const { employee } = useFetch(db, Number(id));

  const filterAttendances = (
    start: Date | string,
    end: Date | string,
    attendances: Attendance[]
  ) => {
    let filteredAttendances: Attendance[] = [];
    const formattedStart = new Date(formatDate(start));
    const formattedEnd = new Date(formatDate(end));

    filteredAttendances = attendances.filter((attendance) => {
      const date = new Date(formatDate(attendance.date));
      return (
        date.valueOf() >= formattedStart.valueOf() &&
        date.valueOf() <= formattedEnd.valueOf()
      );
    });
    return filteredAttendances;
  };

  const formatEmployee = (employee: Employee | undefined) => {
    if (!employee) return undefined;

    return {
      ...employee,
      attendances:
        employee && employee.attendances
          ? filterAttendances(start, end, employee.attendances)
          : undefined,
    };
  };

  const formattedEmployee: Employee | undefined = formatEmployee(employee);

  let earnings = { basic: 0, claims: 0, ot: 0 };
  let totalEarnings = 0;

  let deductions = { sss: 0, hdmf: 0, phic: 0, advances: 0 };
  let totalDeductions = 0;

  if (formattedEmployee) {
    earnings = getEarnings(start, end, formattedEmployee);
    totalEarnings = getObjectTotal(earnings);

    deductions = getDeductions(start, end, formattedEmployee);
    totalDeductions = getObjectTotal(deductions);
  }

  if (
    !formattedEmployee ||
    !formattedEmployee.schedule ||
    !formattedEmployee.attendances
  ) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <View>
          <Text>Payroll Period</Text>
          <Text>
            {formatDate(start, "MMMM dd, yyyy")} -{" "}
            {formatDate(end, "MMMM dd, yyyy")} ({getWorkingHours(start, end)}{" "}
            Hours)
          </Text>
        </View>

        <View>
          <Text>Employee ID</Text>
          <Text>{formattedEmployee.employee_id}</Text>
        </View>

        <View>
          <Text>Employee Name</Text>
          <Text>
            {formattedEmployee.last_name}, {formattedEmployee.first_name}{" "}
            {formattedEmployee.middle_initial}.
          </Text>
        </View>

        <View>
          <Text>Rate</Text>
          <Text>Php {formatNumber(formattedEmployee.rate)}</Text>
        </View>

        <View>
          <Text>Hours</Text>
          <Text>
            {formatNumber(
              getPeriodHours(
                formattedEmployee.schedule,
                formattedEmployee.attendances
              )
            )}{" "}
            Hours
          </Text>
        </View>

        <Text className="font-bold">Earnings</Text>

        <View>
          <Text>Basic Pay</Text>
          <Text>Php {formatNumber(earnings.basic)}</Text>
        </View>

        <View>
          <Text>Overtime Pay</Text>
          <Text>Php {formatNumber(earnings.ot)}</Text>
        </View>

        <View>
          <Text>Expense Claims</Text>
          <Text>Php {formatNumber(earnings.claims)}</Text>
        </View>

        <View>
          <Text className="font-bold">Gross Income</Text>
          <Text>Php {formatNumber(totalEarnings)}</Text>
        </View>

        <Text className="font-bold">Deductions</Text>

        <View>
          <Text>SSS Contribution</Text>
          <Text>Php {formatNumber(deductions.sss)}</Text>
        </View>

        <View>
          <Text>HDMF Contribution</Text>
          <Text>Php {formatNumber(deductions.hdmf)}</Text>
        </View>

        <View>
          <Text>PHIC Contribution</Text>
          <Text>Php {formatNumber(deductions.phic)}</Text>
        </View>

        {deductions.advances > 0 && (
          <View>
            <Text>Cash Advances</Text>
            <Text>Php {formatNumber(deductions.advances)}</Text>
          </View>
        )}

        <View>
          <Text className="font-bold">Net Income</Text>
          <Text>Php {formatNumber(totalEarnings - totalDeductions)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewPage;
