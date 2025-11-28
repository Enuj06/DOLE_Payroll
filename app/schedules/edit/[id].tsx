import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import Loader from "@/components/Loader";
import { schedules } from "@/db/schema";
import useFetch from "@/hooks/schedules/useFetch";
import { schedule as schema, Schedule as Values } from "@/schemas/globals";
import {
  formatTime,
  getDb,
  startOfDate,
  toastVisibilityTime,
} from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { eq } from "drizzle-orm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useImmer } from "use-immer";

const EditPage = () => {
  const { id } = useLocalSearchParams();
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const [modalVisibility, setModalVisibility] = useImmer({
    am_in: false,
    am_out: false,
    pm_in: false,
    pm_out: false,
  });

  const { schedule } = useFetch(db, Number(id));

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
    if (schedule) {
      try {
        await db
          .update(schedules)
          .set({
            ...values,
            am_in: startOfDate(values.am_in).toISOString(),
            am_out: startOfDate(values.am_out).toISOString(),
            pm_in: startOfDate(values.pm_in).toISOString(),
            pm_out: startOfDate(values.pm_out).toISOString(),
          })
          .where(eq(schedules.id, schedule.id));

        Toast.show({
          type: "success",
          text1: "Updated Schedule",
          visibilityTime: toastVisibilityTime,
        });

        router.navigate("/schedules");
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

  if (!schedule) return <Loader />;

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
        <Text className="text-3xl font-extrabold text-[#2C3C49] mb-6">
          Edit Schedule
        </Text>

        <View className="bg-white rounded-2xl shadow-md p-5 border border-gray-200">
          <View className="gap-6">
            {["am_in", "am_out", "pm_in", "pm_out"].map((field) => {
              const labelName = field
                .replace("_", " ")
                .toUpperCase()
                .replace("AM", "AM")
                .replace("PM", "PM");

              return (
                <View key={field}>
                  <Label
                    name={labelName}
                    className="text-center text-[#2C3C49] text-base bg-[#a5bfe8] px-3 py-1 rounded-full font-semibold"
                  />

                  <Controller
                    control={control}
                    name={field as any}
                    defaultValue={new Date(schedule[field as keyof Values] as any)}
                    render={({ field: { value, onChange } }) => (
                      <TouchableOpacity
                        className="flex-row items-center justify-between bg-gray-100 rounded-xl px-4 py-3 mt-2 border border-gray-300"
                        onPress={() =>
                          setModalVisibility((draft) => {
                            draft[field as keyof typeof draft] = true;
                          })
                        }
                      >
                        <Text className="text-gray-700 text-base">
                          {value ? formatTime(value) : "Select time"}
                        </Text>
                        <MaterialIcons name="schedule" size={22} color="#2C3C49" />
                      </TouchableOpacity>
                    )}
                  />

                  <ErrorMessage error={errors[field as keyof Values]} />
                </View>
              );
            })}
          </View>

          <View className="mt-8 flex-row justify-between">
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="bg-[#3C6EBD] flex-1 py-3 rounded-xl mr-3"
            >
              <Text className="text-center text-white font-semibold text-base">
                Update Schedule
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

      {/* DateTimePickers */}
      {Object.entries(modalVisibility).map(([key, visible]) => {
        if (!visible) return null;
        return (
          <DateTimePicker
            key={key}
            value={getValues(key as keyof Values) || new Date()}
            mode="time"
            onChange={async (event, value) => {
              if (event.type === "set" && value) {
                setValue(key as keyof Values, value);
                await trigger(key as keyof Values);
              }
              setModalVisibility((draft) => {
                draft[key as keyof typeof draft] = false;
              });
            }}
          />
        );
      })}
    </>
  );
};

export default EditPage;
