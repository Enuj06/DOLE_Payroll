import { Transaction } from "@/types/globals";
import { formatDate, formatNumber } from "@/utils/globals";
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
  transaction: Transaction | null;
  onClose: (transaction: Transaction | null) => void;
};

const TransactionModal = ({ transaction, onClose }: Props) => {
  return (
    <>
      {transaction && (
        <Modal
          visible={!!transaction}
          animationType="slide"
          transparent={true}
          onRequestClose={() => onClose(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {transaction && (
                <ScrollView>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Transaction Details</Text>

                    <Pressable onPress={() => onClose(null)}>
                      <MaterialIcons name="close" size={24} />
                    </Pressable>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Transaction ID</Text>

                    <Text style={styles.detailValue}>{transaction.id}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Employee</Text>

                    <Text
                      style={styles.detailValue}
                    >{`${transaction.first_name} ${transaction.last_name}`}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date</Text>

                    <Text style={styles.detailValue}>
                      {formatDate(transaction.date)}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Amount</Text>

                    <Text style={styles.detailValue}>
                      {`₱${formatNumber(transaction.amount)}`}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Payment Method</Text>

                    <Text style={styles.detailValue}>{transaction.method}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status</Text>

                    <Text
                      style={[
                        styles.detailValue,
                        {
                          color:
                            transaction.status === "Completed"
                              ? "#16a34a"
                              : "#f59e0b",
                        },
                      ]}
                    >
                      {transaction.status}
                    </Text>
                  </View>

                  <View style={styles.line} />

                  <Text style={styles.detailNote}>{transaction.details}</Text>

                  <TouchableOpacity style={styles.primaryBtn}>
                    <MaterialIcons name="print" size={20} color="#fff" />
                    <Text style={styles.primaryText}>Export Receipt</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default TransactionModal;

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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  detailLabel: {
    color: "#475569",
  },
  detailValue: {
    fontWeight: "700",
    color: "#111827",
  },
  detailNote: {
    color: "#334155",
    marginTop: 8,
    marginBottom: 20,
  },
  line: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 10,
  },
  primaryBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
});
