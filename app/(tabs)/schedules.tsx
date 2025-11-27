import DeleteAlert from "@/components/DeleteAlert";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import useDelete from "@/hooks/schedules/useDelete";
import useFetchAll from "@/hooks/schedules/useFetchAll";
import { Schedule } from "@/types/globals";
import { formatTime, getDb } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SchedulesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { schedules, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

  const columns = [
    {
      key: "am_in",
      header: "AM IN",
      width: 5,
      render: (row: Schedule) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${formatTime(row.am_in)}`}</Text>
      ),
    },
    {
      key: "am_out",
      header: "AM OUT",
      width: 5,
      render: (row: Schedule) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${formatTime(row.am_out)}`}</Text>
      ),
    },
    {
      key: "pm_in",
      header: "PM IN",
      width: 5,
      render: (row: Schedule) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${formatTime(row.pm_in)}`}</Text>
      ),
    },
    {
      key: "pm_out",
      header: "PM OUT",
      width: 5,
      render: (row: Schedule) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${formatTime(row.pm_out)}`}</Text>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: 9,
      render: (row: Schedule) => (
        <View className="flex-row gap-4 justify-center">
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "/schedules/edit/[id]",
                params: { id: row.id },
              })
            }
          >
            <MaterialIcons name="edit" size={20} color="#2196F3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              DeleteAlert(row.id, "Schedule", handleDelete);
            }}
          >
            <MaterialIcons name="delete" size={20} color="#E53935" />
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  if (!schedules) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Schedules</Text>

        <TouchableOpacity onPress={() => router.navigate("/schedules/add")}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Table columns={columns} rows={schedules} />
      </View>
    </SafeAreaView>
  );
};

export default SchedulesPage;
