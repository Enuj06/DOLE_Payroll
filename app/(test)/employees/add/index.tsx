import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import { employee as schema, Employee as Values } from "@/schemas/globals";
import { getDb } from "@/utils/globals";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPage = () => {
  const db = getDb();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    console.log(values);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text>Add Employee</Text>

      <View className="my-4">
        <View>
          <View>
            <Label name="Last Name" />

            <Controller
              control={control}
              name="last_name"
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <TextInput
                    placeholder="Enter last name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </>
              )}
            />

            <ErrorMessage error={errors.last_name} />
          </View>

          <View>
            <Label name="First Name" />

            <Controller
              control={control}
              name="first_name"
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <TextInput
                    placeholder="Enter first name"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </>
              )}
            />

            <ErrorMessage error={errors.first_name} />
          </View>
        </View>

        <View className="mt-4">
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Text className="font-b">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddPage;
