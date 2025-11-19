import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Table = ({ data }) => {
  const rowStyle =
    "w-[6.5rem] px-4 py-2 text-sm text-center text-[#3C492C] h-[2.7rem] border-[0.0625rem] border-[#F0F0F0]";
  const columns = [
    "Name",
    "Sales",
    "Revenue",
    "Cost",
    "Profit",
    "Inventory",
    "Rating",
    "Category",
    "Supplier",
    "Margin",
  ];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const renderColumns = (columns: string[]) => {
    return (
      <View className="flex-row items-center">
        {columns.map((column, index) => (
          <TouchableOpacity
            key={index}
            className="items-center justify-center border-[#D9D9D9] py-2 px-3 w-[6.5rem] border-[0.0625rem]"
          >
            <View className="flex-row">
              <Text className="font-semibold text-sm">{column}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderRow = (item: any) => {
    return (
      <View className="flex-row">
        <Text className={rowStyle}>{item.name}</Text>
        <Text className={rowStyle}>{item.sales}</Text>
        <Text className={rowStyle}>{item.revenue}</Text>
        <Text className={rowStyle}>{item.cost}</Text>
        <Text className={rowStyle}>{item.profit}</Text>
        <Text className={rowStyle}>{item.inventory}</Text>
        <Text className={rowStyle}>{item.rating}</Text>
        <Text className={rowStyle}>{item.category}</Text>
        <Text className={rowStyle}>{item.supplier}</Text>
        <Text className={rowStyle}>{item.margin}</Text>
      </View>
    );
  };

  return (
    <View className="bg-white w-full p-4">
      <View className="flex-row">
        <ScrollView horizontal>
          <FlatList
            data={tableData}
            keyExtractor={(_, index) => index + ""}
            ListHeaderComponent={renderColumns(columns)}
            renderItem={({ item }) => {
              return renderRow(item);
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Table;
