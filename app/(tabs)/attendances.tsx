import DeleteAlert from "@/components/DeleteAlert";
import Loader from "@/components/Loader";
import PeriodModal from "@/components/PeriodModal";
import Table from "@/components/Table";
import useDelete from "@/hooks/attendances/useDelete";
import useFetchAll from "@/hooks/attendances/useFetchAll";
import { period as schema, Period as Values } from "@/schemas/globals";
import { Attendance } from "@/types/globals";
import {
  formatDate,
  formatNumber,
  getDate,
  getDayHours,
  getDb,
  getTime,
  getTimeDifference,
} from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImmer } from "use-immer";

const AttendancesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();
  const form = useForm({ resolver: yupResolver(schema) });

  const [period, setPeriod] = useImmer<{
    start: Date | string;
    end: Date | string;
  }>({
    start: new Date(),
    end: new Date(),
  });
  const [isPeriodModalVisible, setIsPeriodModalVisible] = useImmer(false);

  const { attendances, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

  const filteredAttendances = useMemo(() => {
    if (attendances) {
      const start = new Date(getDate(period.start));
      const end = new Date(getDate(period.end));

      return attendances.filter((attendance) => {
        const date = new Date(getDate(attendance.date));
        return (
          date.valueOf() >= start.valueOf() && date.valueOf() <= end.valueOf()
        );
      });
    }
  }, [period, attendances]);

  const handlePeriodModalToggle = (isVisible: boolean) => {
    setIsPeriodModalVisible(isVisible);
  };

  const handlePeriodModalSubmit = async (values: Values) => {
    const start = values.start;
    const end = values.end;

    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0, 0);

    setPeriod({ start, end });
    setIsPeriodModalVisible(false);
  };

  const columns = [
    {
      key: "employee_id",
      header: "Employee ID",
      width: 6,
      render: (row: Attendance) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${row.employee ? `${row.employee.employee_id}` : ""}`}</Text>
      ),
    },
    {
      key: "name",
      header: "Name",
      width: 10,
      render: (row: Attendance) => (
        <Text className="text-sm text-center text-[#3C492C]">
          {`${row.employee ? `${row.employee.last_name}, ${row.employee.first_name} ${row.employee.middle_initial}.` : ""}`}
        </Text>
      ),
    },
    {
      key: "am_in",
      header: "AM IN",
      width: 5,
      render: (row: Attendance) => {
        if (row.employee && row.employee.schedule && row.am_in) {
          const difference = getTimeDifference(
            row.employee.schedule.am_in,
            row.am_in
          );

          const color = difference < 0 ? "red" : "#3C492C";

          return (
            <Text
              className="text-sm text-center"
              style={{ color }}
            >{`${getTime(row.am_in)}`}</Text>
          );
        }
      },
    },
    {
      key: "am_out",
      header: "AM OUT",
      width: 5,
      render: (row: Attendance) => {
        if (row.employee && row.employee.schedule && row.am_out) {
          const difference = getTimeDifference(
            row.employee.schedule.am_out,
            row.am_out
          );

          const color = difference > 0 ? "red" : "#3C492C";

          return (
            <Text
              className="text-sm text-center"
              style={{ color }}
            >{`${getTime(row.am_out)}`}</Text>
          );
        }
      },
    },
    {
      key: "total_am",
      header: "Total Time",
      width: 6,
      render: (row: Attendance) => {
        if (row.employee && row.employee.schedule && row.am_in && row.am_out) {
          const hours = getDayHours(
            row.employee.schedule.am_in,
            row.employee.schedule.am_out,
            row.am_in,
            row.am_out
          );
          return (
            <Text className="text-sm text-center">
              {formatNumber(hours)} Hours
            </Text>
          );
        }
      },
    },
    {
      key: "pm_in",
      header: "PM IN",
      width: 5,
      render: (row: Attendance) => {
        if (row.employee && row.employee.schedule && row.pm_in) {
          const difference = getTimeDifference(
            row.employee.schedule.pm_in,
            row.pm_in
          );

          const color = difference < 0 ? "red" : "#3C492C";

          return (
            <Text
              className="text-sm text-center"
              style={{ color }}
            >{`${getTime(row.pm_in)}`}</Text>
          );
        }
      },
    },
    {
      key: "pm_out",
      header: "PM OUT",
      width: 5,
      render: (row: Attendance) => {
        if (row.employee && row.employee.schedule && row.pm_out) {
          const difference = getTimeDifference(
            row.employee.schedule.pm_out,
            row.pm_out
          );

          const color = difference > 0 ? "red" : "#3C492C";

          return (
            <Text
              className="text-sm text-center"
              style={{ color }}
            >{`${getTime(row.pm_out)}`}</Text>
          );
        }
      },
    },
    {
      key: "total_pm",
      header: "Total Time",
      width: 6,
      render: (row: Attendance) => {
        if (row.employee && row.employee.schedule && row.pm_in && row.pm_out) {
          const hours = getDayHours(
            row.employee.schedule.pm_in,
            row.employee.schedule.pm_out,
            row.pm_in,
            row.pm_out
          );
          return (
            <Text className="text-sm text-center">
              {formatNumber(hours)} Hours
            </Text>
          );
        }
      },
    },
    {
      key: "date",
      header: "Date",
      width: 9,
      render: (row: Attendance) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${formatDate(row.date)}`}</Text>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: 9,
      render: (row: Attendance) => (
        <View className="flex-row gap-4 justify-center">
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "/attendances/edit/[id]",
                params: { id: row.id },
              })
            }
          >
            <MaterialIcons name="edit" size={20} color="#2196F3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              DeleteAlert(row.id, "Attendance", handleDelete);
            }}
          >
            <MaterialIcons name="delete" size={20} color="#E53935" />
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  if (!attendances || !filteredAttendances) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Attendances</Text>

        <TouchableOpacity onPress={() => router.navigate("/attendances/add")}>
          <Text>Add</Text>
        </TouchableOpacity>

        <PeriodModal
          form={form}
          isVisible={isPeriodModalVisible}
          onToggle={handlePeriodModalToggle}
          onSubmit={handlePeriodModalSubmit}
        />
      </View>

      <View className="mt-4">
        <Table columns={columns} rows={filteredAttendances} />
      </View>
    </SafeAreaView>
  );
};

export default AttendancesPage;
