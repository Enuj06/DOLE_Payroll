import Table from "@/components/Table";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Test = () => {
  type Product = {
    id: number;
    name: string;
    sales: number;
    revenue: number;
    cost: number;
    profit: number;
    inventory: number;
    rating: number;
    category: string;
    supplier: string;
    margin: number;
  };

  const columns = [
    {
      key: "test",
      header: "Test",
      width: 7,
      render: (row: Product) => (
        <Text className="text-sm text-center text-[#3C492C]">{`${row.name.split(" ")[1]}-${row.sales}`}</Text>
      ),
    },
    {
      key: "name",
      header: "Name",
      width: 7,
    },
    {
      key: "sales",
      header: "Sales",
      width: 7,
    },
    {
      key: "revenue",
      header: "Revenue",
      width: 7,
    },
    {
      key: "cost",
      header: "Cost",
      width: 7,
    },
    {
      key: "profit",
      header: "Profit",
      width: 7,
    },
    {
      key: "inventory",
      header: "Inventory",
      width: 7,
    },
    {
      key: "rating",
      header: "Rating",
      width: 7,
    },
    {
      key: "category",
      header: "Category",
      width: 7,
    },
    {
      key: "supplier",
      header: "Supplier",
      width: 7,
    },
    {
      key: "margin",
      header: "Margin",
      width: 7,
    },
  ];

  const rows: Product[] = [
    {
      id: 1,
      name: "Product A",
      sales: 100,
      revenue: 5000,
      cost: 3000,
      profit: 2000,
      inventory: 50,
      rating: 4.5,
      category: "Electronics",
      supplier: "Supplier X",
      margin: 0.4,
    },
    {
      id: 2,
      name: "Product B",
      sales: 150,
      revenue: 7500,
      cost: 4000,
      profit: 3500,
      inventory: 70,
      rating: 4.2,
      category: "Clothing",
      supplier: "Supplier Y",
      margin: 0.3,
    },
    {
      id: 3,
      name: "Product C",
      sales: 80,
      revenue: 4000,
      cost: 2000,
      profit: 2000,
      inventory: 30,
      rating: 4.0,
      category: "Home Appliances",
      supplier: "Supplier Z",
      margin: 0.5,
    },
    {
      id: 4,
      name: "Product D",
      sales: 120,
      revenue: 6000,
      cost: 3500,
      profit: 2500,
      inventory: 60,
      rating: 4.7,
      category: "Books",
      supplier: "Supplier X",
      margin: 0.45,
    },
    {
      id: 5,
      name: "Product E",
      sales: 90,
      revenue: 4500,
      cost: 2500,
      profit: 2000,
      inventory: 40,
      rating: 4.3,
      category: "Toys",
      supplier: "Supplier Y",
      margin: 0.35,
    },
    {
      id: 6,
      name: "Product F",
      sales: 200,
      revenue: 10000,
      cost: 6000,
      profit: 4000,
      inventory: 80,
      rating: 4.9,
      category: "Electronics",
      supplier: "Supplier Z",
      margin: 0.4,
    },
    {
      id: 7,
      name: "Product G",
      sales: 110,
      revenue: 5500,
      cost: 3500,
      profit: 2000,
      inventory: 60,
      rating: 4.6,
      category: "Furniture",
      supplier: "Supplier W",
      margin: 0.3,
    },
    {
      id: 8,
      name: "Product H",
      sales: 130,
      revenue: 6500,
      cost: 4000,
      profit: 2500,
      inventory: 70,
      rating: 4.4,
      category: "Sports Equipment",
      supplier: "Supplier V",
      margin: 0.35,
    },
    {
      id: 9,
      name: "Product I",
      sales: 140,
      revenue: 7000,
      cost: 4500,
      profit: 2500,
      inventory: 60,
      rating: 4.6,
      category: "Tools",
      supplier: "Supplier X",
      margin: 0.35,
    },
    {
      id: 10,
      name: "Product J",
      sales: 170,
      revenue: 8500,
      cost: 5000,
      profit: 3500,
      inventory: 80,
      rating: 4.8,
      category: "Groceries",
      supplier: "Supplier Y",
      margin: 0.4,
    },
    {
      id: 11,
      name: "Product K",
      sales: 90,
      revenue: 4500,
      cost: 3000,
      profit: 1500,
      inventory: 40,
      rating: 4.1,
      category: "Beauty",
      supplier: "Supplier Z",
      margin: 0.33,
    },
    {
      id: 12,
      name: "Product L",
      sales: 180,
      revenue: 9000,
      cost: 5500,
      profit: 3500,
      inventory: 90,
      rating: 4.7,
      category: "Health",
      supplier: "Supplier W",
      margin: 0.4,
    },
    {
      id: 13,
      name: "Product M",
      sales: 100,
      revenue: 5000,
      cost: 2500,
      profit: 2500,
      inventory: 50,
      rating: 4.5,
      category: "Office Supplies",
      supplier: "Supplier X",
      margin: 0.5,
    },
    {
      id: 14,
      name: "Product N",
      sales: 120,
      revenue: 6000,
      cost: 3500,
      profit: 2500,
      inventory: 60,
      rating: 4.3,
      category: "Kitchen",
      supplier: "Supplier Y",
      margin: 0.45,
    },
    {
      id: 15,
      name: "Product O",
      sales: 200,
      revenue: 10000,
      cost: 6000,
      profit: 4000,
      inventory: 80,
      rating: 4.9,
      category: "Automotive",
      supplier: "Supplier Z",
      margin: 0.4,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Table columns={columns} rows={rows} />
    </SafeAreaView>
  );
};

export default Test;
