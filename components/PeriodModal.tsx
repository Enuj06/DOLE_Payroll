import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import { Period as Values } from "@/schemas/globals";
import { getDate } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller, UseFormReturn } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useImmer } from "use-immer";

type Props = {
  form: UseFormReturn<Values, unknown, Values>;
  isVisible: boolean;
  onToggle: (isVisible: boolean) => void;
  onSubmit: (values: Values) => Promise<void>;
};

const PeriodModal = ({ form, isVisible, onToggle, onSubmit }: Props) => {
  const [modalVisibility, setModalVisibility] = useImmer({
    start: false,
    end: false,
  });

  const {
    control,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <>
      <TouchableOpacity onPress={() => onToggle(true)}>
        <Text>Date Filter</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        statusBarTranslucent
        visible={isVisible}
        onRequestClose={() => onToggle(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="w-4/5 gap-2 rounded-[0.625rem] bg-white p-4">
            <Text>Date Filter</Text>

            <View className="my-4">
              <View className="gap-4">
                <View>
                  <Label name="Start" />

                  <Controller
                    control={control}
                    name="start"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <TouchableOpacity
                          className="flex-row items-center justify-between "
                          onPress={() =>
                            setModalVisibility((draft) => {
                              draft.start = true;
                            })
                          }
                        >
                          <Text>{value ? getDate(value) : "Select date"}</Text>

                          <MaterialIcons
                            name="date-range"
                            size={20}
                            color="#555"
                          />
                        </TouchableOpacity>
                      </>
                    )}
                  />

                  <ErrorMessage error={errors.start} />
                </View>

                <View>
                  <Label name="End" />

                  <Controller
                    control={control}
                    name="end"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <TouchableOpacity
                          className="flex-row items-center justify-between "
                          onPress={() =>
                            setModalVisibility((draft) => {
                              draft.end = true;
                            })
                          }
                        >
                          <Text>{value ? getDate(value) : "Select date"}</Text>

                          <MaterialIcons
                            name="date-range"
                            size={20}
                            color="#555"
                          />
                        </TouchableOpacity>
                      </>
                    )}
                  />

                  <ErrorMessage error={errors.end} />
                </View>
              </View>

              <View className="mt-4 flex-row gap-4">
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Text>Apply</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onToggle(false)}>
                  <Text>Back</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {modalVisibility.start && (
        <DateTimePicker
          value={getValues("start") || new Date()}
          mode="date"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("start", value);
              await trigger("start");
            }
            setModalVisibility((draft) => {
              draft.start = false;
            });
          }}
        />
      )}

      {modalVisibility.end && (
        <DateTimePicker
          value={getValues("end") || new Date()}
          mode="date"
          onChange={async (event, value) => {
            if (event.type === "set" && value) {
              setValue("end", value);
              await trigger("end");
            }
            setModalVisibility((draft) => {
              draft.end = false;
            });
          }}
        />
      )}
    </>
  );
};

export default PeriodModal;
