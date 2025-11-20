import { Column } from "@/types/globals";
import { FlatList, ScrollView, Text, View } from "react-native";

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
};

const Table = <T extends { id: number | string }>({
  columns,
  rows,
}: Props<T>) => {
  type TableHeaderProps<T> = {
    columns: Column<T>[];
  };

  const TableHeader = <T,>({ columns }: TableHeaderProps<T>) => {
    return (
      <View className="flex-row items-center">
        {columns.map((column) => (
          <TableColumn key={column.key} column={column} />
        ))}
      </View>
    );
  };

  type TableColumnProps<T> = {
    column: Column<T>;
  };

  const TableColumn = <T,>({ column }: TableColumnProps<T>) => {
    return (
      <View
        className={`items-center justify-center border-[#D9D9D9] py-2 px-3 border-[0.0625rem]`}
        style={{ width: column.width * 16 }}
      >
        <Text className="font-semibold text-sm">{column.header}</Text>
      </View>
    );
  };

  type TableRowProps<T> = {
    columns: Column<T>[];
    row: T;
  };

  const TableRow = <T,>({ columns, row }: TableRowProps<T>) => {
    return (
      <View className="flex-row">
        {columns.map((column) => (
          <TableCell key={column.key} column={column} row={row} />
        ))}
      </View>
    );
  };

  type TableCellProps<T> = {
    column: Column<T>;
    row: T;
  };

  const TableCell = <T,>({ column, row }: TableCellProps<T>) => {
    return (
      <View
        className="px-4 py-2 justify-center h-[2.7rem] border-[0.0625rem] border-[#F0F0F0]"
        style={{ width: column.width * 16 }}
      >
        {column.render ? (
          column.render(row)
        ) : (
          <Text className="text-sm text-center text-[#3C492C]">{`${row[column.key as keyof T]}`}</Text>
        )}
      </View>
    );
  };

  return (
    <View>
      <ScrollView horizontal>
        <FlatList
          data={rows}
          keyExtractor={(row) => `${row.id}`}
          ListHeaderComponent={<TableHeader columns={columns} />}
          renderItem={({ item: row }) => (
            <TableRow columns={columns} row={row} />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default Table;
