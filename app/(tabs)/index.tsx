import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SAMPLE_EMPLOYEES = [
  {
    id: "1",
    name: "Maria Santos",
    position: "Cashier",
    hoursWorked: 160,
    hourlyRate: 120,
  },
  {
    id: "2",
    name: "Juan Dela Cruz",
    position: "Store Manager",
    hoursWorked: 168,
    hourlyRate: 200,
  },
  {
    id: "3",
    name: "Ana Reyes",
    position: "Stock Associate",
    hoursWorked: 150,
    hourlyRate: 100,
  },
  {
    id: "4",
    name: "Mark Tan",
    position: "Delivery",
    hoursWorked: 140,
    hourlyRate: 110,
  },
];

function currency(n) {
  return "₱" + Number(n).toFixed(2);
}

function calculatePayroll(emp) {
  const gross = emp.hoursWorked * emp.hourlyRate;
  const tax = gross * 0.1;
  const sss = gross * 0.03;
  const phil = gross * 0.02;
  const totalDeductions = tax + sss + phil;
  const net = gross - totalDeductions;
  return { gross, tax, sss, phil, totalDeductions, net };
}

const PayrollPage = () => {
  const [employees] = useState(SAMPLE_EMPLOYEES);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.position.toLowerCase().includes(query.toLowerCase())
  );

  const totals = employees.reduce(
    (acc, emp) => {
      const p = calculatePayroll(emp);
      acc.gross += p.gross;
      acc.deductions += p.totalDeductions;
      acc.net += p.net;
      return acc;
    },
    { gross: 0, deductions: 0, net: 0 }
  );

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
          <Text style={styles.summaryValue}>{currency(totals.gross)}</Text>
        </View>
        <View>
          <Text style={styles.summaryLabel}>Total Deductions</Text>
          <Text style={styles.summaryValue}>{currency(totals.deductions)}</Text>
        </View>
        <View>
          <Text style={styles.summaryLabel}>Total Net</Text>
          <Text style={styles.summaryValue}>{currency(totals.net)}</Text>
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={18} />
          <TextInput
            placeholder="Search name or position"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setQuery("")}>
          <Text style={{ fontWeight: "600" }}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item }) => {
            const p = calculatePayroll(item);
            return (
              <TouchableOpacity
                style={styles.employeeRow}
                onPress={() => setSelected(item)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.empName}>{item.name}</Text>
                  <Text style={styles.empPosition}>{item.position}</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.small}>{currency(p.net)}</Text>
                  <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() => setSelected(item)}
                  >
                    <Text style={styles.viewBtnText}>Payslip</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Payslip Modal */}
      <Modal
        visible={!!selected}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selected && (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Payslip</Text>
                  <Pressable onPress={() => setSelected(null)}>
                    <MaterialIcons name="close" size={24} />
                  </Pressable>
                </View>

                <Text style={styles.label}>{selected.name}</Text>
                <Text style={styles.subLabel}>{selected.position}</Text>

                <View style={styles.line} />

                <View style={styles.detailRow}>
                  <Text>Hours Worked</Text>
                  <Text>{selected.hoursWorked}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text>Hourly Rate</Text>
                  <Text>{currency(selected.hourlyRate)}</Text>
                </View>

                <View style={styles.line} />

                {(() => {
                  const p = calculatePayroll(selected);
                  return (
                    <>
                      <View style={styles.detailRow}>
                        <Text>Gross Pay</Text>
                        <Text>{currency(p.gross)}</Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text>Tax (10%)</Text>
                        <Text>{currency(p.tax)}</Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text>SSS (3%)</Text>
                        <Text>{currency(p.sss)}</Text>
                      </View>

                      <View style={styles.detailRow}>
                        <Text>PhilHealth (2%)</Text>
                        <Text>{currency(p.phil)}</Text>
                      </View>

                      <View style={styles.line} />

                      <View style={styles.detailRowBold}>
                        <Text>Net Pay</Text>
                        <Text style={{ fontSize: 18 }}>{currency(p.net)}</Text>
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

  searchRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  searchInput: { marginLeft: 8, flex: 1 },
  filterBtn: {
    marginLeft: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },

  employeeRow: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    elevation: 1,
  },
  empName: { fontWeight: "700", fontSize: 16 },
  empPosition: { color: "#666", marginTop: 4 },
  rowRight: { alignItems: "flex-end" },
  small: { color: "#333", fontWeight: "600" },
  viewBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#eef2ff",
    borderRadius: 6,
  },
  viewBtnText: { fontWeight: "700" },

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
