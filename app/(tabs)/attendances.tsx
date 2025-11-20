import DeleteAlert from "@/components/DeleteAlert";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import useDelete from "@/hooks/attendances/useDelete";
import useFetchAll from "@/hooks/attendances/useFetchAll";
import { Attendance } from "@/types/globals";
import { formatDate, getDb, getTime, getTimeDifference } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AttendancesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { attendances, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

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
      width: 9,
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
        if (row.am_in && row.employee && row.employee.schedule) {
          const difference = getTimeDifference(
            row.am_in,
            row.employee.schedule.am_in
          );

          const color = difference > 0 ? "red" : "#3C492C";

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
      render: (row: Attendance) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${row.am_out ? `${getTime(row.am_out)}` : ""}`}</Text>
      ),
    },
    {
      key: "pm_in",
      header: "PM IN",
      width: 5,
      render: (row: Attendance) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${row.pm_in ? `${getTime(row.pm_in)}` : ""}`}</Text>
      ),
    },
    {
      key: "pm_out",
      header: "PM OUT",
      width: 5,
      render: (row: Attendance) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${row.pm_out ? `${getTime(row.pm_out)}` : ""}`}</Text>
      ),
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

  if (!attendances) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Attendances</Text>

        <TouchableOpacity onPress={() => router.navigate("/attendances/add")}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Table columns={columns} rows={attendances} />
      </View>
    </SafeAreaView>
  );
};

export default AttendancesPage;
