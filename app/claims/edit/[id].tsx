import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import Loader from "@/components/Loader";
import Select from "@/components/Select";
import { claims } from "@/db/schema";
import useFetch from "@/hooks/claims/useFetch";
import useFetchAll from "@/hooks/employees/useFetchAll";
import { claim as schema, Claim as Values } from "@/schemas/globals";
import { getDate, getDb, toastVisibilityTime } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { eq } from "drizzle-orm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useImmer } from "use-immer";

const EditPage = () => {
  const { id } = useLocalSearchParams();

  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const [isDateModalVisible, setIsDateModalVisible] = useImmer(false);

  const { claim } = useFetch(db, Number(id));
  const { employees } = useFetchAll(db);

  const getOptions = () => {
    const options: { label: string; value: string }[] = [];
    if (employees) {
      employees.forEach((employee) => {
        options.push({
          label: `${employee.last_name}, ${employee.first_name} ${employee.middle_initial}.`,
          value: `${employee.id}`,
        });
      });
    }
    return options;
  };

  const {
    control,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    if (claim) {
      try {
        await db
          .update(claims)
          .set({
            ...values,
            date: values.date.toISOString(),
          })
          .where(eq(claims.id, claim.id));
        Toast.show({
          type: "success",
          text1: "Updated Expense Claim",
          visibilityTime: toastVisibilityTime,
        });
        router.navigate("/claims");
      } catch (error) {
        console.error(error);
        Toast.show({
          type: "error",
          text1: "An Error Has Occured. Please Try Again.",
          visibilityTime: toastVisibilityTime,
        });
      }
    }
  };

  if (!claim) {
    return <Loader />;
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
        <Text>Edit Expense Claim</Text>

        <View className="my-4">
          <View className="gap-4">
            <View>
              <Label name="Reason" />

              <Controller
                control={control}
                name="reason"
                defaultValue={claim.reason}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TextInput
                      placeholder="Enter reason"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  </>
                )}
              />

              <ErrorMessage error={errors.reason} />
            </View>

            <View>
              <Label name="Date" />

              <Controller
                control={control}
                name="date"
                defaultValue={new Date(claim.date)}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-between "
                      onPress={() => setIsDateModalVisible(true)}
                    >
                      <Text>{value ? getDate(value) : "Select date"}</Text>

                      <MaterialIcons name="date-range" size={20} color="#555" />
                    </TouchableOpacity>
                  </>
                )}
              />

              <ErrorMessage error={errors.date} />
            </View>

            <View>
              <Label name="Amount" />

              <Controller
                control={control}
                name="amount"
                defaultValue={claim.amount}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Enter amount"
                      value={value ? `${value}` : ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  </>
                )}
              />

              <ErrorMessage error={errors.amount} />
            </View>

            <View>
              <Label name="Employee" />

              <Controller
                control={control}
                name="employee_id"
                defaultValue={claim.employee_id}
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <Select
                      value={`${value}`}
                      options={getOptions()}
                      placeholder="Select Employee"
                      onChange={onChange}
                    />
                  </>
                )}
              />

              <ErrorMessage error={errors.employee_id} />
            </View>
          </View>

          <View className="mt-4 flex-row gap-4">
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <Text>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {isDateModalVisible && (
        <DateTimePicker
          value={getValues("date") || new Date()}
          mode="date"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("date", value);
              await trigger("date");
            }
            setIsDateModalVisible(false);
          }}
        />
      )}
    </>
  );
};

export default EditPage;
