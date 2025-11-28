import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import Loader from "@/components/Loader";
import Select from "@/components/Select";
import { employees } from "@/db/schema";
import useFetch from "@/hooks/employees/useFetch";
import useFetchAll from "@/hooks/schedules/useFetchAll";
import { employee as schema, Employee as Values } from "@/schemas/globals";
import { formatTime, getDb, toastVisibilityTime } from "@/utils/globals";
import { yupResolver } from "@hookform/resolvers/yup";
import { eq } from "drizzle-orm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";

const EditPage = () => {
  const { id } = useLocalSearchParams();
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { employee } = useFetch(db, Number(id));
  const { schedules } = useFetchAll(db);

  const getOptions = () => {
    const options: { label: string; value: string }[] = [];
    if (schedules) {
      schedules.forEach((schedule) => {
        options.push({
          label: `${formatTime(schedule.am_in)}-${formatTime(
            schedule.am_out
          )}  ${formatTime(schedule.pm_in)}-${formatTime(schedule.pm_out)}`,
          value: `${schedule.id}`,
        });
      });
    }
    return options;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    if (employee) {
      try {
        await db
          .update(employees)
          .set(values)
          .where(eq(employees.id, employee.id));

        Toast.show({
          type: "success",
          text1: "Updated Employee",
          visibilityTime: toastVisibilityTime,
        });

        router.navigate("/employees");
      } catch (error) {
        console.error(error);

        Toast.show({
          type: "error",
          text1: "An Error Has Occurred. Please Try Again.",
          visibilityTime: toastVisibilityTime,
        });
      }
    }
  };

  if (!employee) return <Loader />;

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text className="text-3xl font-extrabold text-[#2C3C49] mb-6">
        Edit Employee
      </Text>

      <View className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <View className="flex-row gap-4">
          <View className="flex-1 gap-6">

            {/* LAST NAME */}
            <View>
              <Label
                name="LAST NAME"
                className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 rounded-xl font-semibold"
              />
              <Controller
                control={control}
                name="last_name"
                defaultValue={employee.last_name}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-gray-100 mt-2 px-4 py-3 rounded-xl border border-gray-300"
                    placeholder="Enter last name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <ErrorMessage error={errors.last_name} />
            </View>

            <View>
              <Label
                name="MIDDLE INITIAL"
                className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 rounded-xl font-semibold"
              />
              <Controller
                control={control}
                name="middle_initial"
                defaultValue={employee.middle_initial}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-gray-100 mt-2 px-4 py-3 rounded-xl border border-gray-300"
                    placeholder="Enter middle initial"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <ErrorMessage error={errors.middle_initial} />
            </View>

            
          </View>

          {/* RIGHT COLUMN */}
          <View className="flex-1 gap-6">

            {/* FIRST NAME */}
            <View>
              <Label
                name="FIRST NAME"
                className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 rounded-xl font-semibold"
              />
              <Controller
                control={control}
                name="first_name"
                defaultValue={employee.first_name}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-gray-100 mt-2 px-4 py-3 rounded-xl border border-gray-300"
                    placeholder="Enter first name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <ErrorMessage error={errors.first_name} />
            </View>

            {/* POSITION */}
            <View>
              <Label
                name="POSITION"
                className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 rounded-xl font-semibold"
              />
              <Controller
                control={control}
                name="position"
                defaultValue={employee.position}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-gray-100 mt-2 px-4 py-3 rounded-xl border border-gray-300"
                    placeholder="Enter position"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <ErrorMessage error={errors.position} />
            </View>

          </View>
        </View>

<View>
              <Label
                name="RATE"
                className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 rounded-xl mt-4 font-semibold"
              />
            <Controller
              control={control}
              name="rate"
              defaultValue={employee.rate}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  keyboardType="numeric"
                  placeholder="Enter rate"
                  className="bg-gray-100 rounded-xl px-4 py-3 mt-2  border text-center border-gray-300"
                  value={value ? `${value}` : ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
              <ErrorMessage error={errors.rate} />
            </View>
        {/* ====================== SCHEDULE SECTION (CENTER) ====================== */}
        <View className="mt-4 items-center">
          <Label
            name="SCHEDULE"
            className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-32 py-1 rounded-xl font-semibold"
          />

          <View className="w-full">
            <Controller
              control={control}
              name="schedule_id"
              defaultValue={employee.schedule_id ?? -1}
              render={({ field: { value, onChange } }) => (
                <Select
                  value={`${value}`}
                  options={getOptions()}
                  placeholder="Select Schedule"
                  onChange={onChange}
                />
              )}
            />
            <ErrorMessage error={errors.schedule_id} />
          </View>
        </View>

        {/* BUTTONS */}
        <View className="mt-2 flex-row justify-between">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-[#3C6EBD] flex-1 py-3 rounded-xl mr-3"
          >
            <Text className="text-center text-white font-semibold text-base">
              Update Employee
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-gray-300 flex-1 py-3 rounded-xl"
          >
            <Text className="text-center text-[#333] font-semibold text-base">
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditPage;
