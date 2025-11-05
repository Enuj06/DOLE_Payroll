import TransactionModal from "@/components/Modals/TransactionModal";
import TransactionsTable from "@/components/Tables/TransactionsTable";
import { Transaction } from "@/types/globals";
import { formatNumber } from "@/utils/globals";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
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
    <SafeAreaView className="flex-1 bg-[#f1f5f9] p-5">
      <View className="flex-row items-center my-5 gap-2.5">
        <FontAwesome5 name="receipt" size={22} color="#1e293b" />
        <Text className="font-bold text-xl"> Payroll Transactions</Text>
      </View>

      <View className="flex-row justify-between bg-white p-3 rounded-xl mb-3">
        <View>
          <Text className="text-sm text-[##6b7280]">Total Payouts</Text>

          <Text className="font-bold text-lg">{`₱${formatNumber(totals.total)}`}</Text>
        </View>

        <View>
          <Text className="text-sm text-[##6b7280]">Completed</Text>
          <Text className="font-bold text-lg">{totals.completed}</Text>
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
