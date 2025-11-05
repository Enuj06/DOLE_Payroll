import { Employee } from "@/types/globals";
import { calculate, formatNumber } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useImmer } from "use-immer";

type Props = {
  employees: Employee[];
  onPress: (employee: Employee | null) => void;
};

const EmployeesTable = ({ employees, onPress }: Props) => {
  const [searchQuery, setSearchQuery] = useImmer("");

  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      return a.last_name < b.last_name ? -1 : a.last_name > b.last_name ? 1 : 0;
    });
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    const columns = ["last_name", "first_name", "position", "rate", "hours"];

    if (searchQuery && sortedEmployees) {
      return sortedEmployees.filter((employee) => {
        const isValid = columns.some((column) => {
          const value = employee[column as keyof Employee];
          return value
            ? `${value}`.toLowerCase().includes(searchQuery.toLowerCase())
            : false;
        });
        if (isValid) return employee;
      });
    }

    return sortedEmployees;
  }, [sortedEmployees, searchQuery]);

  return (
    <View>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <MaterialIcons name="search" size={18} />

          <TextInput
            placeholder="Search name or position"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setSearchQuery("")}
        >
          <Text style={{ fontWeight: "600" }}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredEmployees}
          keyExtractor={(employee) => `${employee.id}`}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={({ item: employee }) => {
            const pay = calculate(employee);
            return (
              <View style={styles.employeeRow}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={styles.empName}
                  >{`${employee.first_name} ${employee.last_name}`}</Text>
                  <Text style={styles.empPosition}>{employee.position}</Text>
                </View>

                <View style={styles.rowRight}>
                  <Text
                    style={styles.small}
                  >{`₱${formatNumber(pay.net)}`}</Text>

                  <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() => onPress(employee)}
                  >
                    <Text style={styles.viewBtnText}>Payslip</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default EmployeesTable;

const styles = StyleSheet.create({
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
});
