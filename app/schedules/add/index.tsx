import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import { schedules } from "@/db/schema";
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
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useImmer } from "use-immer";

const AddPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const [modalVisibility, setModalVisibility] = useImmer({
    am_in: false,
    am_out: false,
    pm_in: false,
    pm_out: false,
  });

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
    try {
      await db.insert(schedules).values({
        ...values,
        am_in: startOfDate(values.am_in).toISOString(),
        am_out: startOfDate(values.am_out).toISOString(),
        pm_in: startOfDate(values.pm_in).toISOString(),
        pm_out: startOfDate(values.pm_out).toISOString(),
      });

      Toast.show({
        type: "success",
        text1: "Added Schedule",
        visibilityTime: toastVisibilityTime,
      });

      router.navigate("/schedules");
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
    <>
      <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
        <Text className="text-2xl font-bold text-[#3C492C] mb-4">Add Schedule</Text>

        <View className="my-4">
          <View className="gap-4">
            <View>
              <Label
            name="AM IN"
            className="bg-[#EEF4EB]  px-4 py-1 rounded-full font-semibold"
          />

              <Controller
                control={control}
                name="am_in"
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-between "
                      onPress={() =>
                        setModalVisibility((draft) => {
                          draft.am_in = true;
                        })
                      }
                    >
                      <Text>{value ? formatTime(value) : "Select time"}</Text>

                      <MaterialIcons name="date-range" size={20} color="#555" />
                    </TouchableOpacity>
                  </>
                )}
              />

              <ErrorMessage error={errors.am_in} />
            </View>

            <View>
              <Label name="AM Out" />

              <Controller
                control={control}
                name="am_out"
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-between "
                      onPress={() =>
                        setModalVisibility((draft) => {
                          draft.am_out = true;
                        })
                      }
                    >
                      <Text>{value ? formatTime(value) : "Select time"}</Text>

                      <MaterialIcons name="date-range" size={20} color="#555" />
                    </TouchableOpacity>
                  </>
                )}
              />

              <ErrorMessage error={errors.am_out} />
            </View>

            <View>
              <Label name="PM In" />

              <Controller
                control={control}
                name="pm_in"
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-between "
                      onPress={() =>
                        setModalVisibility((draft) => {
                          draft.pm_in = true;
                        })
                      }
                    >
                      <Text>{value ? formatTime(value) : "Select time"}</Text>

                      <MaterialIcons name="date-range" size={20} color="#555" />
                    </TouchableOpacity>
                  </>
                )}
              />

              <ErrorMessage error={errors.pm_in} />
            </View>

            <View>
              <Label name="PM Out" />

              <Controller
                control={control}
                name="pm_out"
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-between "
                      onPress={() =>
                        setModalVisibility((draft) => {
                          draft.pm_out = true;
                        })
                      }
                    >
                      <Text>{value ? formatTime(value) : "Select time"}</Text>

                      <MaterialIcons name="date-range" size={20} color="#555" />
                    </TouchableOpacity>
                  </>
                )}
              />

              <ErrorMessage error={errors.pm_out} />
            </View>
          </View>

          <View className="mt-4 flex-row gap-4">
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
              <Text>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {modalVisibility.am_in && (
        <DateTimePicker
          value={getValues("am_in") || new Date()}
          mode="time"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("am_in", value);
              await trigger("am_in");
            }
            setModalVisibility((draft) => {
              draft.am_in = false;
            });
          }}
        />
      )}

      {modalVisibility.am_out && (
        <DateTimePicker
          value={getValues("am_out") || new Date()}
          mode="time"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("am_out", value);
              await trigger("am_out");
            }
            setModalVisibility((draft) => {
              draft.am_out = false;
            });
          }}
        />
      )}

      {modalVisibility.pm_in && (
        <DateTimePicker
          value={getValues("pm_in") || new Date()}
          mode="time"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("pm_in", value);
              await trigger("pm_in");
            }
            setModalVisibility((draft) => {
              draft.pm_in = false;
            });
          }}
        />
      )}

      {modalVisibility.pm_out && (
        <DateTimePicker
          value={getValues("pm_out") || new Date()}
          mode="time"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("pm_out", value);
              await trigger("pm_out");
            }
            setModalVisibility((draft) => {
              draft.pm_out = false;
            });
          }}
        />
      )}
    </>
  );
};

export default AddPage;
