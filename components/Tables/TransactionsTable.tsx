import { Transaction } from "@/types/globals";
import { formatDate, formatNumber } from "@/utils/globals";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type Props = {
  transactions: Transaction[];
  onPress: (transaction: Transaction | null) => void;
};

const TransactionsTable = ({ transactions, onPress }: Props) => {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(transaction) => `${transaction.id}`}
      contentContainerStyle={{ paddingBottom: 80 }}
      renderItem={({ item: transaction }) => (
        <TouchableOpacity
          className="flex-row justify-between bg-white p-3.5 mb-2.5 rounded-xl"
          onPress={() => onPress(transaction)}
        >
          <View style={{ flex: 1 }}>
            <Text className="font-bold text-lg">{`${transaction.first_name} ${transaction.last_name}`}</Text>

            <Text className="text-[#64748b]">
              {formatDate(transaction.date)}
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text className="font-bold">{`₱${formatNumber(transaction.amount)}`}</Text>

            <Text
              className={`mt-1 font-semibold ${transaction.status === "Completed" ? "text-[#16a34a]" : "text-[#f59e0b]"}`}
            >
              {transaction.status}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default TransactionsTable;
