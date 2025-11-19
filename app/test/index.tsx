import Table from "@/components/Table";
import sampleData from "@/components/tableData";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TestPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Table data={sampleData} />
    </SafeAreaView>
  );
};

export default TestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
