import PayslipModal from "@/components/Modals/PayslipModal";
import EmployeesTable from "@/components/Tables/EmployeesTable";
import { Employee } from "@/types/globals";
import { calculate, formatNumber } from "@/utils/globals";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImmer } from "use-immer";

const data = [
  {
    id: 1,
    last_name: "Santos",
    first_name: "Maria",
    position: "Cashier",
    rate: 120,
    hours: 160,
  },
  {
    id: 2,
    last_name: "Dela Cruz",
    first_name: "Juan",
    position: "Store Manager",
    rate: 200,
    hours: 168,
  },
  {
    id: 3,
    last_name: "Reyes",
    first_name: "Ana",
    position: "Stock Associate",
    rate: 100,
    hours: 150,
  },
  {
    id: 4,
    last_name: "Tan",
    first_name: "Mark",
    position: "Delivery",
    rate: 110,
    hours: 140,
  },
];

const PayrollPage = () => {
  const [employees] = useImmer(data);
  const [selectedEmployee, setSelectedEmployee] = useImmer<Employee | null>(
    null
  );

  const calculateTotals = () => {
    const total = { gross: 0, deductions: 0, net: 0 };

    employees.forEach((employee) => {
      const pay = calculate(employee);
      total.gross += pay.gross;
      total.deductions += pay.deductions;
      total.net += pay.net;
    });

    return total;
  };

  const totals = calculateTotals();

  const handleEmployeeChange = (employee: Employee | null) => {
    setSelectedEmployee(employee);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="file-invoice" size={22} />
          <Text style={styles.title}> Payroll Dashboard</Text>
        </View>

        <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
          <MaterialIcons name="download" size={20} />
          <Text style={styles.iconText}>Export</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total Gross</Text>
          <Text
            style={styles.summaryValue}
          >{`₱${formatNumber(totals.gross)}`}</Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Total Deductions</Text>
          <Text
            style={styles.summaryValue}
          >{`₱${formatNumber(totals.deductions)}`}</Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Total Net</Text>
          <Text
            style={styles.summaryValue}
          >{`₱${formatNumber(totals.net)}`}</Text>
        </View>
      </View>

      <EmployeesTable employees={employees} onPress={handleEmployeeChange} />

      <PayslipModal
        employee={selectedEmployee}
        onClose={handleEmployeeChange}
      />
    </SafeAreaView>
  );
};

export default PayrollPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    alignItems: "center",
    padding: 12,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 20,
  },
  title: { fontSize: 18, fontWeight: "700", marginLeft: 8 },
  iconBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 8,
  },
  iconText: { marginLeft: 6, fontWeight: "600" },
  summaryCard: {
    width: "100%",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryLabel: { color: "#666", fontSize: 12 },
  summaryValue: { fontSize: 16, fontWeight: "700", marginTop: 6 },
});
