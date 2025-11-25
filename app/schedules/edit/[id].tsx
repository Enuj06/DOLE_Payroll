import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import Loader from "@/components/Loader";
import { schedules } from "@/db/schema";
import useFetch from "@/hooks/schedules/useFetch";
import { schedule as schema, Schedule as Values } from "@/schemas/globals";
import { getDb, getTime, toastVisibilityTime } from "@/utils/globals";
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
            am_in: values.am_in.toISOString(),
            am_out: values.am_out.toISOString(),
            pm_in: values.pm_in.toISOString(),
            pm_out: values.pm_out.toISOString(),
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
          text1: "An Error Has Occured. Please Try Again.",
          visibilityTime: toastVisibilityTime,
        });
      }
    }
  };

  if (!schedule) {
    return <Loader />;
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
        <Text>Edit Schedule</Text>

        <View className="my-4">
          <View className="gap-4">
            <View>
              <Label name="AM In" />

              <Controller
                control={control}
                name="am_in"
                defaultValue={new Date(schedule.am_in)}
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
                      <Text>{value ? getTime(value) : "Select time"}</Text>

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
                defaultValue={new Date(schedule.am_out)}
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
                      <Text>{value ? getTime(value) : "Select time"}</Text>

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
                defaultValue={new Date(schedule.pm_in)}
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
                      <Text>{value ? getTime(value) : "Select time"}</Text>

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
                defaultValue={new Date(schedule.pm_out)}
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
                      <Text>{value ? getTime(value) : "Select time"}</Text>

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
              <Text>Update</Text>
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

export default EditPage;
