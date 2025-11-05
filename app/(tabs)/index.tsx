import EmployeesTable from "@/components/Tables/EmployeesTable";
import { Employee } from "@/types/globals";
import { calculate, formatNumber } from "@/utils/globals";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const [selectedEmployee, setSelectedEmployee] = useImmer<
    Employee | undefined
  >(undefined);

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

  const handleSelect = (employee: Employee) => {
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
          >{`₱${formatNumber(calculateTotals().gross)}`}</Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Total Deductions</Text>
          <Text
            style={styles.summaryValue}
          >{`₱${formatNumber(calculateTotals().deductions)}`}</Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Total Net</Text>
          <Text
            style={styles.summaryValue}
          >{`₱${formatNumber(calculateTotals().net)}`}</Text>
        </View>
      </View>

      <EmployeesTable employees={employees} onSelect={handleSelect} />

      {selectedEmployee && (
        <Modal
          animationType="slide"
          transparent
          statusBarTranslucent
          visible={!!selectedEmployee}
          onRequestClose={() => setSelectedEmployee(undefined)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedEmployee && (
                <ScrollView>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Payslip</Text>

                    <Pressable onPress={() => setSelectedEmployee(undefined)}>
                      <MaterialIcons name="close" size={24} />
                    </Pressable>
                  </View>

                  <Text
                    style={styles.label}
                  >{`${selectedEmployee.first_name} ${selectedEmployee.last_name}`}</Text>
                  <Text style={styles.subLabel}>
                    {selectedEmployee.position}
                  </Text>

                  <View style={styles.line} />

                  <View style={styles.detailRow}>
                    <Text>Hours Worked</Text>
                    <Text>{selectedEmployee.hours}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text>Hourly Rate</Text>
                    <Text>{`₱${formatNumber(selectedEmployee.rate)}`}</Text>
                  </View>

                  <View style={styles.line} />

                  {(() => {
                    const pay = calculate(selectedEmployee);
                    return (
                      <>
                        <View style={styles.detailRow}>
                          <Text>Gross Pay</Text>
                          <Text>{`₱${formatNumber(pay.gross)}`}</Text>
                        </View>

                        <View style={styles.detailRow}>
                          <Text>Tax (10%)</Text>
                          <Text>{`₱${formatNumber(pay.tax)}`}</Text>
                        </View>

                        <View style={styles.detailRow}>
                          <Text>SSS (3%)</Text>
                          <Text>{`₱${formatNumber(pay.sss)}`}</Text>
                        </View>

                        <View style={styles.detailRow}>
                          <Text>PhilHealth (2%)</Text>
                          <Text>{`₱${formatNumber(pay.phil)}`}</Text>
                        </View>

                        <View style={styles.line} />

                        <View style={styles.detailRowBold}>
                          <Text>Net Pay</Text>
                          <Text
                            style={{ fontSize: 18 }}
                          >{`₱${formatNumber(pay.net)}`}</Text>
                        </View>

                        <TouchableOpacity
                          style={styles.primaryBtn}
                          onPress={() => {}}
                        >
                          <Text style={styles.primaryBtnText}>
                            Print / Export
                          </Text>
                        </TouchableOpacity>
                      </>
                    );
                  })()}
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      )}
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalTitle: { fontSize: 18, fontWeight: "800" },
  label: { fontSize: 16, fontWeight: "700" },
  subLabel: { color: "#666", marginBottom: 8 },
  line: { height: 1, backgroundColor: "#f0f0f0", marginVertical: 10 },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  detailRowBold: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  primaryBtn: {
    marginTop: 16,
    backgroundColor: "#0f172a",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
});
