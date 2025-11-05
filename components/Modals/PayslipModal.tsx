import { Employee } from "@/types/globals";
import { calculate, formatNumber } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

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
          <View className="flex-1 bg-black/35 justify-center items-center p-4">
            <View className="w-full max-h-[85%] bg-white rounded-xl p-4">
              <ScrollView>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-extrabold text-xl">Payslip</Text>

                  <TouchableOpacity onPress={() => onClose(null)}>
                    <MaterialIcons name="close" size={24} />
                  </TouchableOpacity>
                </View>

                <View className="gap-1.5">
                  <Text className="font-bold text-lg">{`${employee.first_name} ${employee.last_name}`}</Text>

                  <Text className="text-[#666]">{employee.position}</Text>
                </View>

                <View className="h-0.5 bg-[#f0f0f0] my-2.5" />

                <View className="flex-row justify-between py-1.5">
                  <Text>Hours Worked</Text>
                  <Text>{employee.hours}</Text>
                </View>

                <View className="flex-row justify-between py-1.5">
                  <Text>Hourly Rate</Text>
                  <Text>{`₱${formatNumber(employee.rate)}`}</Text>
                </View>

                <View className="h-0.5 bg-[#f0f0f0] my-2.5" />

                {(() => {
                  const pay = calculate(employee);
                  return (
                    <>
                      <View className="flex-row justify-between py-1.5">
                        <Text>Gross Pay</Text>
                        <Text>{`₱${formatNumber(pay.gross)}`}</Text>
                      </View>

                      <View className="flex-row justify-between py-1.5">
                        <Text>Tax (10%)</Text>
                        <Text>{`₱${formatNumber(pay.tax)}`}</Text>
                      </View>

                      <View className="flex-row justify-between py-1.5">
                        <Text>SSS (3%)</Text>
                        <Text>{`₱${formatNumber(pay.sss)}`}</Text>
                      </View>

                      <View className="flex-row justify-between py-1.5">
                        <Text>PhilHealth (2%)</Text>
                        <Text>{`₱${formatNumber(pay.phil)}`}</Text>
                      </View>

                      <View className="h-0.5 bg-[#f0f0f0] my-2.5" />

                      <View className="flex-row justify-between py-2">
                        <Text>Net Pay</Text>

                        <Text className="text-xl">{`₱${formatNumber(pay.net)}`}</Text>
                      </View>

                      <TouchableOpacity
                        className="mt-4 bg-[#0f172a] py-3 rounded-lg items-center"
                        onPress={() => {}}
                      >
                        <Text className="text-white font-bold">
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
