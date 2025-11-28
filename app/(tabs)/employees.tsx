import DeleteAlert from "@/components/DeleteAlert";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import useDelete from "@/hooks/employees/useDelete";
import useFetchAll from "@/hooks/employees/useFetchAll";
import { Employee } from "@/types/globals";
import { formatNumber, formatTime, getDb } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmployeesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { employees, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

  const columns = [
    {
      key: "employee_id",
      header: "Employee ID",
      width: 6,
      render: (row: Employee) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${row.employee_id}`}</Text>
      ),
    },
    {
      key: "name",
      header: "Name",
      width: 10,
      render: (row: Employee) => (
        <Text className="text-sm text-center text-[#3C492C]">
          {`${row.last_name}, ${row.first_name} ${row.middle_initial}.`}
        </Text>
      ),
    },
    {
      key: "position",
      header: "Position",
      width: 6,
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
      key: "schedule",
      header: "Schedule",
      width: 12,
      render: (row: Employee) => (
        <Text className="text-sm text-center text-[#3C492C]">
          {row.schedule
            ? `${formatTime(row.schedule.am_in)} - ${formatTime(row.schedule.am_out)} / ${formatTime(row.schedule.pm_in)} - ${formatTime(row.schedule.pm_out)}`
            : ""}
        </Text>
      ),
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
                pathname: "/employees/edit/[id]",
                params: { id: row.id },
              })
            }
          >
            <MaterialIcons name="edit" size={20} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              DeleteAlert(row.id, "Employee", handleDelete);
            }}
          >
            <MaterialIcons name="delete" size={20} color="#E53935" />
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  if (!employees) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb]">
      <View className="px-4 pt-4 pb-3 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-[#3C492C] mb-4">Employees</Text>
        <TouchableOpacity
          onPress={() => router.navigate("/employees/add")}
          className="bg-[#3c6ebd] rounded-lg py-3 px-4 flex-row items-center justify-center gap-2"
        >
          <MaterialIcons name="add" size={20} color="white" />
          <Text className="text-white font-semibold">Add Employee</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4 px-4 flex-1">
        <Table columns={columns} rows={employees} />
      </View>
    </SafeAreaView>
  );
};

export default EmployeesPage;
