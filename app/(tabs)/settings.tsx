import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const [region, setRegion] = useState("NCR");
  const [minWage, setMinWage] = useState("610");
  const [regularHours, setRegularHours] = useState("8");
  const [restDays, setRestDays] = useState("1");

  const [otRate, setOtRate] = useState("25"); // 25% overtime on ordinary day
  const [nightDiffRate, setNightDiffRate] = useState("10"); // 10% for work between 10 PM – 6 AM
  const [restDayRate, setRestDayRate] = useState("30"); // 30% additional pay
  const [holidayRate, setHolidayRate] = useState("100"); // 100% additional pay (total 200%)

  const [sssRate, setSssRate] = useState("4.5");
  const [philHealthRate, setPhilHealthRate] = useState("5.0");
  const [pagibigRate, setPagibigRate] = useState("2.0");

  const [showNotif, setShowNotif] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-2xl font-bold text-gray-800 mb-4">
           Wage Policy Settings
        </Text>

        <View className="bg-white rounded-2xl p-4 mb-5 shadow">
          <Text className="text-lg font-semibold text-gray-700 mb-3">
            Regional Wage Order
          </Text>

          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Region</Text>
            <TextInput
              value={region}
              onChangeText={setRegion}
              className="border border-gray-300 rounded-xl p-2"
              placeholder="e.g., NCR"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-1">Minimum Daily Wage (₱)</Text>
            <TextInput
              value={minWage}
              onChangeText={setMinWage}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
              placeholder="e.g., 610"
            />
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 mb-5 shadow">
          <Text className="text-lg font-semibold text-gray-700 mb-3">
            Work Hours & Rest Days
          </Text>

          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Regular Work Hours (per day)</Text>
            <TextInput
              value={regularHours}
              onChangeText={setRegularHours}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-1">Rest Days (per week)</Text>
            <TextInput
              value={restDays}
              onChangeText={setRestDays}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
            />
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 mb-5 shadow">
          <Text className="text-lg font-semibold text-gray-700 mb-3">
            Premium Pay (DOLE Standard Rates)
          </Text>

          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Overtime Pay (% of hourly rate)</Text>
            <TextInput
              value={otRate}
              onChangeText={setOtRate}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
            />
          </View>

          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Night Differential (% extra pay)</Text>
            <TextInput
              value={nightDiffRate}
              onChangeText={setNightDiffRate}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
            />
          </View>

          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Rest Day Pay (% extra pay)</Text>
            <TextInput
              value={restDayRate}
              onChangeText={setRestDayRate}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-1">Regular Holiday Pay (% extra pay)</Text>
            <TextInput
              value={holidayRate}
              onChangeText={setHolidayRate}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
            />
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 mb-5 shadow">
          <Text className="text-lg font-semibold text-gray-700 mb-3">
            Statutory Contributions
          </Text>

          <View className="mb-3">
            <Text className="text-gray-600 mb-1">SSS Contribution (%)</Text>
            <TextInput
              value={sssRate}
              onChangeText={setSssRate}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
            />
          </View>

          <View className="mb-3">
            <Text className="text-gray-600 mb-1">PhilHealth Contribution (%)</Text>
            <TextInput
              value={philHealthRate}
              onChangeText={setPhilHealthRate}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-1">Pag-IBIG Contribution (%)</Text>
            <TextInput
              value={pagibigRate}
              onChangeText={setPagibigRate}
              keyboardType="numeric"
              className="border border-gray-300 rounded-xl p-2"
            />
          </View>
        </View>

        <View className="bg-white rounded-2xl p-4 shadow">
          <Text className="text-lg font-semibold text-gray-700 mb-3">System Preferences</Text>

          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-600">Enable Wage Policy Notifications</Text>
            <Switch value={showNotif} onValueChange={setShowNotif} />
          </View>
        </View>

        <TouchableOpacity className="bg-blue-600 mt-6 p-4 rounded-2xl items-center shadow">
          <Ionicons name="save-outline" size={20} color="white" />
          <Text className="text-white font-semibold mt-1">Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
