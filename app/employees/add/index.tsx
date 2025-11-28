import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import Select from "@/components/Select";
import * as models from "@/db/schema";
import useFetchAll from "@/hooks/schedules/useFetchAll";
import { employee as schema, Employee as Values } from "@/schemas/globals";
import { formatTime, getDb, toastVisibilityTime } from "@/utils/globals";
import { yupResolver } from "@hookform/resolvers/yup";
import { desc } from "drizzle-orm";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const AddPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();
  const { schedules } = useFetchAll(db);

  const getOptions = () => {
    const options: { label: string; value: string }[] = [];
    if (schedules) {
      schedules.forEach((schedule) => {
        options.push({
          label: `${formatTime(schedule.am_in)}-${formatTime(schedule.am_out)} ${formatTime(schedule.pm_in)}-${formatTime(schedule.pm_out)}`,
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
    try {
      const employees = await db
        .select()
        .from(models.employees)
        .orderBy(desc(models.employees.id))
        .limit(1);

      let employee_id = 0;
      if (employees.length > 0) employee_id = Number(employees[0].employee_id);

      await db.insert(models.employees).values({
        ...values,
        employee_id: `${++employee_id}`.padStart(8, "0"),
      });

      Toast.show({
        type: "success",
        text1: "Added Employee",
        visibilityTime: toastVisibilityTime,
      });

      router.navigate("/employees");
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text className="text-3xl font-extrabold text-[#2C3C49] mb-6">
        Add Employee
      </Text>

      <View className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
        <View className="flex-row gap-4">
          {/* Left Column */}
          <View className="flex-1 gap-6">
            <View>
              <Label
                name="LAST NAME"
                className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 rounded-xl font-semibold"
              />
              <Controller
                control={control}
                name="last_name"
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
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-gray-100 mt-2 px-4 py-3 rounded-xl border border-gray-300"
                    placeholder="Enter Middle Initial"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <ErrorMessage error={errors.middle_initial} />
            </View>
          </View>

          {/* Right Column */}
          <View className="flex-1 gap-6">
            <View>
              <Label
                name="FIRST NAME"
                className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 rounded-xl font-semibold"
              />
              <Controller
                control={control}
                name="first_name"
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

            <View>
              <Label
                name="POSITION"
                className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 rounded-xl font-semibold"
              />
              <Controller
                control={control}
                name="position"
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
                    <View className="justify-center">
              <Label
                name="RATE"
                className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 mt-4 rounded-xl font-semibold"
              />
              <Controller
                control={control}
                name="rate"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-gray-100 mt-2 px-4 py-3 rounded-xl border border-gray-300 text-center"
                    placeholder="Enter rate"
                    keyboardType="numeric"
                    value={value ? `${value}` : ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
              <ErrorMessage error={errors.rate} />
            </View>
        <View>
          <Label
            name="SCHEDULE"
            className="text-center text-[#2C3C49] text-base mx-2 mt-4 bg-[#a5bfe8] px-3 py-1 rounded-xl font-semibold"
          />
          <View>
            <Controller
              control={control}
              name="schedule_id"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={`${value ?? -1}`}
                  options={getOptions()}
                  placeholder="Select Schedule"
                  onChange={onChange}
                />
              )}
            />
          </View>
          <ErrorMessage error={errors.schedule_id} />
        </View>

        <View className="mt-8 flex-row justify-between">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-[#3C6EBD] flex-1 py-3 rounded-xl mr-3"
          >
            <Text className="text-center text-white font-semibold text-base">
              Add Employee
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

export default AddPage;
