import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, LayoutAnimation, Platform, UIManager } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface DailyRecord {
  id: string;
  date: string;
  totalHours: number;
  details: {
    amIn: string;
    amOut: string;
    pmIn: string;
    pmOut: string;
    otIn?: string;
    otOut?: string;
  };
}

const Timesheet = () => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const timesheetData: DailyRecord[] = [
    {
      id: "1",
      date: "Mon, Oct 28, 2025",
      totalHours: 8.5,
      details: { amIn: "8:00 AM", amOut: "12:00 PM", pmIn: "1:00 PM", pmOut: "5:00 PM", otIn: "6:00 PM", otOut: "7:30 PM" },
    },
    {
      id: "2",
      date: "Tue, Oct 29, 2025",
      totalHours: 8,
      details: { amIn: "8:15 AM", amOut: "12:00 PM", pmIn: "1:00 PM", pmOut: "5:15 PM" },
    },
    {
      id: "3",
      date: "Wed, Oct 30, 2025",
      totalHours: 7.5,
      details: { amIn: "8:00 AM", amOut: "12:00 PM", pmIn: "1:30 PM", pmOut: "4:30 PM" },
    },
  ];

  const totalHours = timesheetData.reduce((acc, day) => acc + day.totalHours, 0);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedDay(expandedDay === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      <View className="bg-white rounded-2xl p-5 mb-4 shadow">
        <Text className="text-lg font-semibold text-gray-700">Employee: Maria Santos</Text>
        <Text className="text-3xl font-bold text-blue-600 mt-1">{totalHours.toFixed(1)} hrs</Text>
        <Text className="text-gray-500">Total Hours Worked</Text>
      </View>

      <Text className="text-lg font-semibold mb-2 text-gray-700">Tracked Days</Text>
      <FlatList
        data={timesheetData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-3">
            <TouchableOpacity
              onPress={() => toggleExpand(item.id)}
              className="bg-white rounded-2xl shadow p-4 flex-row justify-between items-center"
            >
              <View>
                <Text className="text-base font-semibold text-gray-800">{item.date}</Text>
                <Text className="text-gray-500">{item.totalHours} hrs</Text>
              </View>
              <Ionicons
                name={expandedDay === item.id ? "chevron-up" : "chevron-down"}
                size={20}
                color="#555"
              />
            </TouchableOpacity>

            {expandedDay === item.id && (
              <View className="bg-blue-50 rounded-2xl mt-2 p-3">
                <Text className="text-gray-700 font-semibold mb-1">Time Details:</Text>
                <Text className="text-gray-600">AM: {item.details.amIn} – {item.details.amOut}</Text>
                <Text className="text-gray-600">PM: {item.details.pmIn} – {item.details.pmOut}</Text>
                {item.details.otIn && (
                  <Text className="text-gray-600">OT: {item.details.otIn} – {item.details.otOut}</Text>
                )}
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Timesheet;
