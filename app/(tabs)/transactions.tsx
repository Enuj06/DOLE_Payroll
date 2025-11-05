import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView, Pressable } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';


const SAMPLE_TRANSACTIONS = [
  {
    id: 'T-1001',
    name: 'Maria Santos',
    date: '2025-10-30',
    amount: 25000.0,
    status: 'Completed',
    method: 'Bank Transfer',
    details: 'Monthly salary for October 2025',
  },
  {
    id: 'T-1002',
    name: 'Juan Dela Cruz',
    date: '2025-10-30',
    amount: 30000.0,
    status: 'Completed',
    method: 'GCash',
    details: 'Monthly salary for October 2025',
  },
  {
    id: 'T-1003',
    name: 'Ana Reyes',
    date: '2025-10-30',
    amount: 20000.0,
    status: 'Pending',
    method: 'Bank Transfer',
    details: 'Monthly salary for October 2025',
  },
  {
    id: 'T-1004',
    name: 'Mark Tan',
    date: '2025-10-30',
    amount: 22000.0,
    status: 'Completed',
    method: 'Cash',
    details: 'Monthly salary for October 2025',
  },
];

function currency(n) {
  return '₱' + Number(n).toFixed(2);
}

export default function TransactionPage() {
  const [transactions] = useState(SAMPLE_TRANSACTIONS);
  const [selected, setSelected] = useState(null);

  const totals = transactions.reduce(
    (acc, t) => {
      acc.total += t.amount;
      if (t.status === 'Completed') acc.completed += t.amount;
      return acc;
    },
    { total: 0, completed: 0 }
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="receipt" size={22} color="#1e293b" />
        <Text style={styles.headerTitle}> Payroll Transactions</Text>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total Payouts</Text>
          <Text style={styles.summaryValue}>{currency(totals.total)}</Text>
        </View>
        <View>
          <Text style={styles.summaryLabel}>Completed</Text>
          <Text style={styles.summaryValue}>{currency(totals.completed)}</Text>
        </View>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => setSelected(item)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.date}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.amount}>{currency(item.amount)}</Text>
              <Text
                style={[
                  styles.status,
                  { color: item.status === 'Completed' ? '#16a34a' : '#f59e0b' },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

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
                  <Text style={styles.modalTitle}>Transaction Details</Text>
                  <Pressable onPress={() => setSelected(null)}>
                    <MaterialIcons name="close" size={24} />
                  </Pressable>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Transaction ID</Text>
                  <Text style={styles.detailValue}>{selected.id}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Employee</Text>
                  <Text style={styles.detailValue}>{selected.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>{selected.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Amount</Text>
                  <Text style={styles.detailValue}>{currency(selected.amount)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Payment Method</Text>
                  <Text style={styles.detailValue}>{selected.method}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status</Text>
                  <Text
                    style={[
                      styles.detailValue,
                      { color: selected.status === 'Completed' ? '#16a34a' : '#f59e0b' },
                    ]}
                  >
                    {selected.status}
                  </Text>
                </View>
                <View style={styles.line} />
                <Text style={styles.detailNote}>{selected.details}</Text>

                <TouchableOpacity style={styles.primaryBtn}>
                  <MaterialIcons name="print" size={20} color="#fff" />
                  <Text style={styles.primaryText}>Export Receipt</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 22,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#6b7280',
    fontSize: 12,
  },
  summaryValue: {
    fontWeight: '700',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  sub: {
    color: '#64748b',
  },
  amount: {
    fontWeight: '700',
  },
  status: {
    marginTop: 4,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  detailLabel: {
    color: '#475569',
  },
  detailValue: {
    fontWeight: '700',
    color: '#111827',
  },
  detailNote: {
    color: '#334155',
    marginTop: 8,
    marginBottom: 20,
  },
  line: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 10,
  },
  primaryBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
});
