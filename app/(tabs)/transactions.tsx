import TransactionModal from "@/components/Modals/TransactionModal";
import TransactionsTable from "@/components/Tables/TransactionsTable";
import { Transaction } from "@/types/globals";
import { formatNumber } from "@/utils/globals";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useImmer } from "use-immer";

const data = [
  {
    id: 1,
    last_name: "Santos",
    first_name: "Maria",
    date: new Date("2025-10-30"),
    amount: 25000,
    method: "Bank Transfer",
    details: "Monthly salary for October 2025",
    status: "Completed",
  },
  {
    id: 2,
    last_name: "Dela Cruz",
    first_name: "Juan",
    date: new Date("2025-10-30"),
    amount: 30000,
    method: "GCash",
    details: "Monthly salary for October 2025",
    status: "Completed",
  },
  {
    id: 3,
    last_name: "Reyes",
    first_name: "Ana",
    date: new Date("2025-10-30"),
    amount: 20000,
    method: "Bank Transfer",
    details: "Monthly salary for October 2025",
    status: "Pending",
  },
  {
    id: 4,
    last_name: "Tan",
    first_name: "Mark",
    date: new Date("2025-10-30"),
    amount: 22000,
    method: "Cash",
    details: "Monthly salary for October 2025",
    status: "Completed",
  },
];

const TransactionsPage = () => {
  const [transactions] = useImmer(data);
  const [selectedTransaction, setSelectedTransaction] =
    useImmer<Transaction | null>(null);

  const calculateTotals = () => {
    const totals = { total: 0, completed: 0 };

    transactions.forEach((transaction) => {
      totals.total = transaction.amount;
      transaction.status === "Completed" && ++totals.completed;
    });

    return totals;
  };

  const totals = calculateTotals();

  const handleTransactionChange = (transaction: Transaction | null) => {
    setSelectedTransaction(transaction);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="receipt" size={22} color="#1e293b" />
        <Text style={styles.headerTitle}> Payroll Transactions</Text>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total Payouts</Text>

          <Text
            style={styles.summaryValue}
          >{`₱${formatNumber(totals.total)}`}</Text>
        </View>

        <View>
          <Text style={styles.summaryLabel}>Completed</Text>
          <Text style={styles.summaryValue}>{totals.completed}</Text>
        </View>
      </View>

      <TransactionsTable
        transactions={transactions}
        onPress={handleTransactionChange}
      />

      <TransactionModal
        transaction={selectedTransaction}
        onClose={handleTransactionChange}
      />
    </SafeAreaView>
  );
};

export default TransactionsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 22,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 8,
  },
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  summaryLabel: {
    color: "#6b7280",
    fontSize: 12,
  },
  summaryValue: {
    fontWeight: "700",
    fontSize: 16,
  },
});
