import Loader from "@/components/Loader";
import useFetch from "@/hooks/employees/useFetch";
import { Attendance, Employee } from "@/types/globals";
import {
  formatDate,
  formatNumber,
  getDb,
  getGross,
  getHDMFContribution,
  getPeriodHours,
  getPHICContribution,
  getSSSContribution,
} from "@/utils/globals";
import { startOfDay } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewPage = () => {
  const { filters }: { filters: string } = useLocalSearchParams();

  const pairs = filters.split("&");
  const id = pairs[0].split("=")[1];
  const start = pairs[1].split("=")[1];
  const end = pairs[2].split("=")[1];

  const db = getDb(useSQLiteContext());

  const { employee } = useFetch(db, Number(id));

  const filterAttendances = (attendances: Attendance[]) => {
    let filteredAttendances: Attendance[] = [];
    const formattedStart = startOfDay(new Date(start));
    const formattedEnd = startOfDay(new Date(end));

    if (attendances) {
      filteredAttendances = attendances.filter((attendance) => {
        const date = startOfDay(new Date(attendance.date));
        return (
          date.valueOf() >= formattedStart.valueOf() &&
          date.valueOf() <= formattedEnd.valueOf()
        );
      });
    }
    return filteredAttendances;
  };

  const formatEmployee = (employee: Employee | undefined) => {
    if (!employee) {
      return undefined;
    }

    return {
      ...employee,
      attendances:
        employee && employee.attendances
          ? filterAttendances(employee.attendances)
          : undefined,
    };
  };

  const formattedEmployee: Employee | undefined = formatEmployee(employee);

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
            {formatDate(start)} - {formatDate(end)}
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

        <View>
          <Text>Gross Income</Text>
          <Text>
            Php{" "}
            {formatNumber(
              getGross(
                formattedEmployee.schedule,
                formattedEmployee.attendances,
                formattedEmployee.rate
              )
            )}
          </Text>
        </View>

        <Text className="font-bold">Deductions</Text>

        <View>
          <Text>SSS Contribution</Text>
          <Text>
            Php {formatNumber(getSSSContribution(formattedEmployee.rate))}
          </Text>
        </View>

        <View>
          <Text>HDMF Contribution</Text>
          <Text>
            Php {formatNumber(getHDMFContribution(formattedEmployee.rate))}
          </Text>
        </View>

        <View>
          <Text>PHIC Contribution</Text>
          <Text>
            Php {formatNumber(getPHICContribution(formattedEmployee.rate))}
          </Text>
        </View>

        <View>
          <Text>SSS Loan</Text>
          <Text>Php 0.00</Text>
        </View>

        <View>
          <Text>HDMF Loan</Text>
          <Text>Php 0.00</Text>
        </View>

        <View>
          <Text>Adjustment</Text>
          <Text>Php 0.00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewPage;
