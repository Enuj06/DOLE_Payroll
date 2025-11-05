import { Employee } from "@/types/globals";
import { calculate, formatNumber } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
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

type Props = {
  employee: Employee | null;
  onClose: (employee: Employee | null) => void;
};

const PayslipModal = ({ employee, onClose }: Props) => {
  return (
    <>
      {employee && (
        <Modal
          animationType="slide"
          transparent
          statusBarTranslucent
          visible={!!employee}
          onRequestClose={() => onClose(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Payslip</Text>

                  <Pressable onPress={() => onClose(null)}>
                    <MaterialIcons name="close" size={24} />
                  </Pressable>
                </View>

                <Text
                  style={styles.label}
                >{`${employee.first_name} ${employee.last_name}`}</Text>
                <Text style={styles.subLabel}>{employee.position}</Text>

                <View style={styles.line} />

                <View style={styles.detailRow}>
                  <Text>Hours Worked</Text>
                  <Text>{employee.hours}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text>Hourly Rate</Text>
                  <Text>{`₱${formatNumber(employee.rate)}`}</Text>
                </View>

                <View style={styles.line} />

                {(() => {
                  const pay = calculate(employee);
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
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default PayslipModal;

const styles = StyleSheet.create({
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
