import ErrorMessage from "@/components/ErrorMessage";
import Label from "@/components/Label";
import Loader from "@/components/Loader";
import { employees } from "@/db/schema";
import useFetch from "@/hooks/employees/useFetch";
import { employee as schema, Employee as Values } from "@/schemas/globals";
import { getDb } from "@/utils/globals";
import { yupResolver } from "@hookform/resolvers/yup";
import { eq } from "drizzle-orm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditPage = () => {
  const { id } = useLocalSearchParams();

  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { employee } = useFetch(db, Number(id));

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
        router.navigate("/employees");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!employee) {
    return <Loader />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text>Edit Employee</Text>

      <View className="my-4">
        <View>
          <View>
            <Label name="Last Name" />

            <Controller
              control={control}
              name="last_name"
              defaultValue={employee.last_name}
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
              defaultValue={employee.first_name}
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
              defaultValue={employee.middle_initial}
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
              defaultValue={employee.position}
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
              defaultValue={employee.rate}
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
            <Text>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditPage;
