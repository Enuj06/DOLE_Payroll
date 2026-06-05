import React, { useState, useMemo } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

interface Schedule {
  am_in: string;
  am_out: string;
  pm_in: string;
  pm_out: string;
}

interface Logs {
  am_in: string;
  am_out: string;
  pm_in: string;
  pm_out: string;
}

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
}

const formatToSeconds = (time: string): number => {
  if (!time) return 0;
  const [h, m] = time.split(":").map(Number);
  return h * 3600 + m * 60;
};

const calculateWorkedSeconds = (schedule: Schedule, logs: Logs): number => {
  let total = 0;

  const scheduleRanges = [
    [formatToSeconds(schedule.am_in), formatToSeconds(schedule.am_out)],
    [formatToSeconds(schedule.pm_in), formatToSeconds(schedule.pm_out)],
  ];

  const logRanges = [
    [formatToSeconds(logs.am_in), formatToSeconds(logs.am_out)],
    [formatToSeconds(logs.pm_in), formatToSeconds(logs.pm_out)],
  ];

  for (let i = 0; i < 2; i++) {
    const schedStart = scheduleRanges[i][0];
    const schedEnd = scheduleRanges[i][1];
    const logStart = logRanges[i][0];
    const logEnd = logRanges[i][1];

    if (logStart && logEnd) {
      const start = Math.max(schedStart, logStart);
      const end = Math.min(schedEnd, logEnd);

      if (end > start) {
        total += end - start;
      }
    }
  }

  return total;
};
 
export default function WorkHoursCalculator() {
  const [salary, setSalary] = useState<string>("430");
  const [multiplier, setMultiplier] = useState<string>("1");
  const [schedule, setSchedule] = useState<Schedule>({
    am_in: "08:00",
    am_out: "12:00",
    pm_in: "13:00",
    pm_out: "17:00",
  });

  const [logs, setLogs] = useState<Logs>({
    am_in: "09:17",
    am_out: "12:02",
    pm_in: "12:24",
    pm_out: "17:20",
  });

  const [category, setCategory] = useState<string>("regular");

  const computed = useMemo(() => {
    const salNum = parseFloat(salary) || 0;

    const schedAM = {
      start: formatToSeconds(schedule.am_in),
      end: formatToSeconds(schedule.am_out),
    };

    const schedPM = {
      start: formatToSeconds(schedule.pm_in),
      end: formatToSeconds(schedule.pm_out),
    };

    const totalSchedSec =
      schedAM.end - schedAM.start + (schedPM.end - schedPM.start);

    const salaryPerSecond = salNum / totalSchedSec;
    const salaryPerMinute = salaryPerSecond * 60;

    const logAM = {
      start: formatToSeconds(logs.am_in),
      end: formatToSeconds(logs.am_out),
    };

    const logPM = {
      start: formatToSeconds(logs.pm_in),
      end: formatToSeconds(logs.pm_out),
    };

    const workedSeconds = calculateWorkedSeconds(schedule, logs);

    let overtimeSec = 0;

    if (logAM.end > schedAM.end) {
      overtimeSec += logAM.end - schedAM.end;
    }

    if (logPM.end > schedPM.end) {
      overtimeSec += logPM.end - schedPM.end;
    }

    overtimeSec = Math.max(0, overtimeSec);

    const regularPay = workedSeconds * salaryPerSecond;

    let overtimePay = 0;
    let dayMultiplier = multiplier ? parseFloat(multiplier) : 1;
    if (category === "regular") {
      overtimePay = overtimeSec * (salaryPerSecond * 1.25);
    }

    const finalPay = regularPay + overtimePay;
    const finalPayWithMultiplier = finalPay * dayMultiplier;

    return {
      salaryPerSecond,
      salaryPerMinute,
      salaryPerHour: salaryPerSecond * 3600,
      workedSeconds,
      workedMinutes: workedSeconds / 60,
      overtimeSec,
      regularPay,
      overtimePay,
      finalPay,
      finalPayWithMultiplier,
    };
  }, [salary, schedule, logs, category]);

  const TimeInput = ({ label, value, onChange }: TimeInputProps) => (
    <View className="w-[48%]">
      <Text className="font-semibold text-gray-700">{label}</Text>
      <TextInput
        value={value}
        onChangeText={(t) => onChange(t)}
        placeholder="HH:MM"
        className="border px-3 py-2 rounded-lg mt-1 bg-white"
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-5 bg-gray-100">
        <View className="bg-white p-4 rounded-2xl shadow mb-5">
          <Text className="text-lg font-bold mb-3 text-center">
            Salary Computation
          </Text>

          <Text className="font-semibold text-gray-700 mb-1">Daily Salary</Text>
          <TextInput
            keyboardType="numeric"
            value={salary}
            onChangeText={(t) => setSalary(t)}
            className="border px-3 py-2 rounded-lg bg-white mb-3"
          />

          <Text className="text-gray-700 mt-2">
            Salary per Hour:{" "}
            <Text className="font-bold">
              ₱{computed.salaryPerHour.toFixed(2)}
            </Text>
          </Text>

          <Text className="text-gray-700 mb-1">
            Salary per Minute:{" "}
            <Text className="font-bold">
              ₱{computed.salaryPerMinute.toFixed(4)}
            </Text>
          </Text>
          <Text className="text-gray-700">
            Salary per Second:{" "}
            <Text className="font-bold">
              ₱{computed.salaryPerSecond.toFixed(6)}
            </Text>
          </Text>
        </View>

        <View className="bg-white p-4 rounded-2xl shadow mb-5">
          <View className="flex-row justify-center items-center mb-2">
            <MaterialIcons name="schedule" size={22} color="#2C3C49" />
            <Text className="text-lg font-bold ml-2">Scheduled Work Hours</Text>
          </View>

          <View className="flex-row justify-between mb-3">
            <TimeInput
              label="AM IN"
              value={schedule.am_in}
              onChange={(v) => setSchedule({ ...schedule, am_in: v })}
            />
            <TimeInput
              label="AM OUT"
              value={schedule.am_out}
              onChange={(v) => setSchedule({ ...schedule, am_out: v })}
            />
          </View>

          <View className="flex-row justify-between">
            <TimeInput
              label="PM IN"
              value={schedule.pm_in}
              onChange={(v) => setSchedule({ ...schedule, pm_in: v })}
            />
            <TimeInput
              label="PM OUT"
              value={schedule.pm_out}
              onChange={(v) => setSchedule({ ...schedule, pm_out: v })}
            />
          </View>

          <Text className="font-semibold text-gray-700 mb-1 mt-2 text-center">Days</Text>
          <TextInput
            keyboardType="numeric"
            value={multiplier}
            onChangeText={(t) => setMultiplier(t)}
            className="border px-3 py-2 rounded-lg bg-white mb-3 text-center"
          />
        </View>

        <View className="bg-white p-4 rounded-2xl shadow mb-5">
          <Text className="text-lg font-bold mb-3">Actual Time Logs</Text>

          <View className="flex-row justify-between mb-3">
            <TimeInput
              label="Time In (AM)"
              value={logs.am_in}
              onChange={(v) => setLogs({ ...logs, am_in: v })}
            />
            <TimeInput
              label="Time Out (AM)"
              value={logs.am_out}
              onChange={(v) => setLogs({ ...logs, am_out: v })}
            />
          </View>

          <View className="flex-row justify-between">
            <TimeInput
              label="Time In (PM)"
              value={logs.pm_in}
              onChange={(v) => setLogs({ ...logs, pm_in: v })}
            />
            <TimeInput
              label="Time Out (PM)"
              value={logs.pm_out}
              onChange={(v) => setLogs({ ...logs, pm_out: v })}
            />
          </View>
        </View>

        <View className="bg-white p-4 rounded-2xl shadow mb-5">
          <Text className="text-lg font-bold mb-3">Category</Text>
          <Picker
            selectedValue={category}
            onValueChange={(v) => setCategory(v)}
          >
            <Picker.Item label="Regular (+25%)" value="regular" />
            <Picker.Item label="GIP (No OT Payment)" value="gip" />
          </Picker>
        </View>

        <View className="bg-white p-4 rounded-2xl shadow mb-10">
          <Text className="text-xl font-bold text-center mb-4 text-[#2C3C49]">
            Final Results
          </Text>

          <Text className="text-gray-700 mb-1">
            Total Worked Seconds:{" "}
            <Text className="font-bold">{computed.workedSeconds}s</Text>
          </Text>
          <Text className="text-gray-700 mb-1">
            Total Worked Minutes:{" "}
            <Text className="font-bold">
              {computed.workedMinutes.toFixed(2)} mins
            </Text>
          </Text>
          <Text className="text-gray-700 mb-1">
            Total Worked Hours:{" "}
            <Text className="font-bold">
              {(computed.workedSeconds / 3600).toFixed(2)}h
            </Text>
          </Text>
          <Text className="text-gray-700 mb-1">
            Overtime Hours:{" "}
            <Text className="font-bold">
              {(computed.overtimeSec / 3600).toFixed(2)}h
            </Text>
          </Text>

          <Text className="text-gray-700 mb-1">
            Overtime Pay:{" "}
            <Text className="font-bold">
              ₱{computed.overtimePay.toFixed(2)}
            </Text>
          </Text>

          <Text className="text-gray-900 text-xl font-bold mt-3">
            Salary per Day: ₱{computed.finalPay.toFixed(2)}
          </Text>
          <Text className="text-gray-900 text-xl font-bold mt-3">
            Final Salary based on Day(s): ₱{computed.finalPayWithMultiplier.toFixed(2)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
