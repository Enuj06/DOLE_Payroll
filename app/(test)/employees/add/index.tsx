import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import * as models from "@/db/schema";
import { employee as schema, Employee as Values } from "@/schemas/globals";
import { getDb } from "@/utils/globals";
import { yupResolver } from "@hookform/resolvers/yup";
import { desc } from "drizzle-orm";
import { Href, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

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
      router.navigate("/employees" as Href);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text>Add Employee</Text>

      <View className="my-4">
        <View className="gap-4">
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

          <View>
            <Label name="Middle Initial" />

            <Controller
              control={control}
              name="middle_initial"
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <TextInput
                    placeholder="Enter middle initial"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </>
              )}
            />

            <ErrorMessage error={errors.first_name} />
          </View>

          <View>
            <Label name="Position" />

            <Controller
              control={control}
              name="position"
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <TextInput
                    placeholder="Enter position"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </>
              )}
            />

            <ErrorMessage error={errors.position} />
          </View>

          <View>
            <Label name="Rate" />

            <Controller
              control={control}
              name="rate"
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Enter rate"
                    value={value ? `${value}` : ""}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </>
              )}
            />

            <ErrorMessage error={errors.rate} />
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
  );
};

export default AddPage;
