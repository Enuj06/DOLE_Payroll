import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { attendances } from "@/db/schema";
import useFetchAll from "@/hooks/employees/useFetchAll";
import { attendance as schema, Attendance as Values } from "@/schemas/globals";
import { getDate, getDb, getTime } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImmer } from "use-immer";

const AddPage = () => {
  const db = getDb();
  const router = useRouter();

  const [modalVisibility, setModalVisibility] = useImmer({
    date: false,
    am_in: false,
    am_out: false,
    pm_in: false,
    pm_out: false,
    ot_in: false,
    ot_out: false,
  });

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
    try {
      await db.insert(attendances).values({
        ...values,
        date: values.date.toISOString(),
        am_in: values.am_in ? values.am_in.toISOString() : null,
        am_out: values.am_out ? values.am_out.toISOString() : null,
        pm_in: values.pm_in ? values.pm_in.toISOString() : null,
        pm_out: values.pm_out ? values.pm_out.toISOString() : null,
        ot_in: values.ot_in ? values.ot_in.toISOString() : null,
        ot_out: values.ot_out ? values.ot_out.toISOString() : null,
      });
      router.navigate("/attendances" as Href);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
        <Text>Add Attendance</Text>

        <View className="my-4">
          <View className="gap-4">
            <View>
              <Label name="Date" />

              <Controller
                control={control}
                name="date"
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-between "
                      onPress={() =>
                        setModalVisibility((draft) => {
                          draft.date = true;
                        })
                      }
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
              <Label name="AM In" />

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

            <View>
              <Label name="OT In" />

              <Controller
                control={control}
                name="ot_in"
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-between "
                      onPress={() =>
                        setModalVisibility((draft) => {
                          draft.ot_in = true;
                        })
                      }
                    >
                      <Text>{value ? getTime(value) : "Select time"}</Text>

                      <MaterialIcons name="date-range" size={20} color="#555" />
                    </TouchableOpacity>
                  </>
                )}
              />

              <ErrorMessage error={errors.ot_in} />
            </View>

            <View>
              <Label name="OT Out" />

              <Controller
                control={control}
                name="ot_out"
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <TouchableOpacity
                      className="flex-row items-center justify-between "
                      onPress={() =>
                        setModalVisibility((draft) => {
                          draft.ot_out = true;
                        })
                      }
                    >
                      <Text>{value ? getTime(value) : "Select time"}</Text>

                      <MaterialIcons name="date-range" size={20} color="#555" />
                    </TouchableOpacity>
                  </>
                )}
              />

              <ErrorMessage error={errors.ot_out} />
            </View>

            <View>
              <Label name="Employee" />

              <Controller
                control={control}
                name="employee_id"
                render={({ field: { value, onChange, onBlur } }) => (
                  <>
                    <Select
                      value={`${value}`}
                      options={getOptions()}
                      placeholder="Select Employee"
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </>
                )}
              />

              <ErrorMessage error={errors.employee_id} />
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

      {modalVisibility.date && (
        <DateTimePicker
          value={getValues("date") || new Date()}
          mode="date"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("date", value);
              await trigger("date");
            }
            setModalVisibility((draft) => {
              draft.date = false;
            });
          }}
        />
      )}

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

      {modalVisibility.ot_in && (
        <DateTimePicker
          value={getValues("ot_in") || new Date()}
          mode="time"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("ot_in", value);
              await trigger("ot_in");
            }
            setModalVisibility((draft) => {
              draft.ot_in = false;
            });
          }}
        />
      )}

      {modalVisibility.ot_out && (
        <DateTimePicker
          value={getValues("ot_out") || new Date()}
          mode="time"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("ot_out", value);
              await trigger("ot_out");
            }
            setModalVisibility((draft) => {
              draft.ot_out = false;
            });
          }}
        />
      )}
    </>
  );
};

export default AddPage;
