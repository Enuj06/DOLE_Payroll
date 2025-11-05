import { Transaction } from "@/types/globals";
import { formatDate, formatNumber } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
          <View className="flex-1 bg-black/35 items-center justify-center p-5">
            <View className="w-full bg-white rounded-xl p-4 max-h-[85%]">
              {transaction && (
                <ScrollView>
                  <View className="flex-row justify-between items-center mb-2.5">
                    <Text className="font-extrabold text-xl">
                      Transaction Details
                    </Text>

                    <TouchableOpacity onPress={() => onClose(null)}>
                      <MaterialIcons name="close" size={24} />
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row justify-between my-2">
                    <Text className="text-[#475569]">Transaction ID</Text>

                    <Text className="text-[#111827] font-bold">
                      {transaction.id}
                    </Text>
                  </View>

                  <View className="flex-row justify-between my-2">
                    <Text className="text-[#475569]">Employee</Text>

                    <Text className="text-[#111827] font-bold">{`${transaction.first_name} ${transaction.last_name}`}</Text>
                  </View>

                  <View className="flex-row justify-between my-2">
                    <Text className="text-[#475569]">Date</Text>

                    <Text className="text-[#111827] font-bold">
                      {formatDate(transaction.date)}
                    </Text>
                  </View>

                  <View className="flex-row justify-between my-2">
                    <Text className="text-[#475569]">Amount</Text>

                    <Text className="text-[#111827] font-bold">
                      {`₱${formatNumber(transaction.amount)}`}
                    </Text>
                  </View>

                  <View className="flex-row justify-between my-2">
                    <Text className="text-[#475569]">Payment Method</Text>

                    <Text className="text-[#111827] font-bold">
                      {transaction.method}
                    </Text>
                  </View>

                  <View className="flex-row justify-between my-2">
                    <Text className="text-[#475569]">Status</Text>

                    <Text
                      className={`font-bold ${transaction.status === "Completed" ? "text-[#16a34a]" : "text-[#f59e0b]"}`}
                    >
                      {transaction.status}
                    </Text>
                  </View>

                  <View className="h-0.5 my-2.5 bg-[#e2e8f0]" />

                  <Text className="text-[#334155] mt-2 mb-5">
                    {transaction.details}
                  </Text>

                  <TouchableOpacity className="flex-row items-center justify-center bg-[#2563eb] py-3.5 gap-1.5 rounded-lg">
                    <MaterialIcons name="print" size={20} color="#fff" />
                    <Text className="font-bold text-white">Export Receipt</Text>
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
