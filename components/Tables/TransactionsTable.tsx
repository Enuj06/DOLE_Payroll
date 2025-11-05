import { Transaction } from "@/types/globals";
import { formatDate, formatNumber } from "@/utils/globals";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
          style={styles.row}
          onPress={() => onPress(transaction)}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={styles.name}
            >{`${transaction.first_name} ${transaction.last_name}`}</Text>

            <Text style={styles.sub}>{formatDate(transaction.date)}</Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={styles.amount}
            >{`₱${formatNumber(transaction.amount)}`}</Text>

            <Text
              style={[
                styles.status,
                {
                  color:
                    transaction.status === "Completed" ? "#16a34a" : "#f59e0b",
                },
              ]}
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
  },
  sub: {
    color: "#64748b",
  },
  amount: {
    fontWeight: "700",
  },
  status: {
    marginTop: 4,
    fontWeight: "600",
  },
});
