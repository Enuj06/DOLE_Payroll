import DeleteAlert from "@/components/DeleteAlert";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import useDelete from "@/hooks/advances/useDelete";
import useFetchAll from "@/hooks/advances/useFetchAll";
import { Advance } from "@/types/globals";
import { formatDate, formatNumber, getDb } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdvancesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { advances, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

  const columns = [
    {
      key: "employee_id",
      header: "Employee ID",
      width: 6,
      render: (row: Advance) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${row.employee ? `${row.employee.employee_id}` : ""}`}</Text>
      ),
    },
    {
      key: "name",
      header: "Name",
      width: 9,
      render: (row: Advance) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${row.employee ? `${row.employee.last_name}, ${row.employee.first_name} ${row.employee.middle_initial}.` : ""}`}</Text>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      width: 7,
      render: (row: Advance) => (
        <Text className="text-sm text-center text-[#3C492C]">{`Php${formatNumber(row.amount)}`}</Text>
      ),
    },
    {
      key: "date",
      header: "Date",
      width: 9,
      render: (row: Advance) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${formatDate(new Date(row.date))}`}</Text>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: 9,
      render: (row: Advance) => (
        <View className="flex-row gap-4 justify-center">
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "/advances/edit/[id]",
                params: { id: row.id },
              })
            }
          >
            <MaterialIcons name="edit" size={20} color="#2196F3" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              DeleteAlert(row.id, "Cash Advance", handleDelete);
            }}
          >
            <MaterialIcons name="delete" size={20} color="#E53935" />
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  if (!advances) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Cash Advances</Text>

        <TouchableOpacity onPress={() => router.navigate("/advances/add")}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <Table columns={columns} rows={advances} />
      </View>
    </SafeAreaView>
  );
};

export default AdvancesPage;
