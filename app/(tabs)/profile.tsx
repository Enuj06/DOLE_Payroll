import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePage = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <FontAwesome5 name="user-circle" size={26} color="#1e293b" />
          <Text style={styles.headerTitle}>Employee Profile</Text>
        </View>

        <View style={styles.profileCard}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.position}>{user.position}</Text>
          <Text style={styles.department}>{user.department}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color="#555" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={20} color="#555" />
            <Text style={styles.infoText}>{user.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="home" size={20} color="#555" />
            <Text style={styles.infoText}>{user.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employment Details</Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="date-range" size={20} color="#555" />
            <Text style={styles.infoText}>Date Hired: {user.dateHired}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="payments" size={20} color="#555" />
            <Text style={styles.infoText}>Salary: {user.salary}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editBtn}>
          <MaterialIcons name="edit" size={20} color="#fff" />
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn}>
          <MaterialIcons name="logout" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },
  position: {
    color: "#475569",
    marginTop: 4,
  },
  department: {
    color: "#94a3b8",
    marginTop: 4,
    fontSize: 13,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
    color: "#1e293b",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    color: "#334155",
  },
  editBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 10,
  },
  editText: { color: "#fff", fontWeight: "700" },
  logoutBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 40,
  },
  logoutText: { color: "#fff", fontWeight: "700" },
});
