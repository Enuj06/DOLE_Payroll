import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const user = {
  name: "Maria Santos",
  position: "Cashier",
  email: "maria.santos@example.com",
  phone: "+63 912 345 6789",
  address: "123 Main St, Calapan City, Oriental Mindoro",
  avatar: "https://i.pravatar.cc/150?img=5",
  department: "Sales Department",
  dateHired: "March 15, 2022",
  salary: "₱25,000.00",
};

const ProfilePage = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc] p-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center mb-4">
          <FontAwesome5 name="user-circle" size={26} color="#1e293b" />
          <Text className="text-2xl font-bold ml-2">Employee Profile</Text>
        </View>

        <View className="bg-white rounded-xl items-center py-5 mb-5 ">
          <Image
            source={{ uri: user.avatar }}
            className="w-[6.75rem] h-[6.75rem] mb-3 rounded-[3.125rem]"
          />

          <View className="items-center">
            <Text className="text-[1.375rem] font-bold text-[#0f172a]">
              {user.name}
            </Text>

            <Text className="text-[#475569]">{user.position}</Text>
            <Text className="text-[#94a3b8] text-sm">{user.department}</Text>
          </View>
        </View>

        <View className="bg-white rounded-xl p-5 mb-5">
          <Text className="font-bold text-lg mb-3 text-[#1e293b]">
            Personal Information
          </Text>

          <View className="flex-row items-center mb-3 gap-2.5">
            <MaterialIcons name="email" size={20} color="#555" />
            <Text className="text-[#334155]">{user.email}</Text>
          </View>

          <View className="flex-row items-center mb-3 gap-2.5">
            <MaterialIcons name="phone" size={20} color="#555" />
            <Text className="text-[#334155]">{user.phone}</Text>
          </View>

          <View className="flex-row items-center mb-3 gap-2.5">
            <MaterialIcons name="home" size={20} color="#555" />
            <Text className="text-[#334155]">{user.address}</Text>
          </View>
        </View>

        <View className="bg-white rounded-xl p-5 mb-5">
          <Text className="font-bold text-lg mb-3 text-[#1e293b]">
            Employment Details
          </Text>

          <View className="flex-row items-center mb-3 gap-2.5">
            <MaterialIcons name="date-range" size={20} color="#555" />
            <Text className="text-[#334155]">Date Hired: {user.dateHired}</Text>
          </View>

          <View className="flex-row items-center mb-3 gap-2.5">
            <MaterialIcons name="payments" size={20} color="#555" />
            <Text className="text-[#334155]">Salary: {user.salary}</Text>
          </View>
        </View>

        <View>
          <TouchableOpacity className="bg-[#2563eb] py-3.5 rounded-xl items-center flex-row justify-center gap-1.5 mb-2.5">
            <MaterialIcons name="edit" size={20} color="#fff" />
            <Text className="text-white font-bold">Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#ef4444] py-3 rounded-lg items-center flex-row justify-center gap-1.5">
            <MaterialIcons name="logout" size={20} color="#fff" />
            <Text className="text-white font-bold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
