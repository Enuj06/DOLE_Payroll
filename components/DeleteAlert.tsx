import { Alert } from "react-native";

const DeleteAlert = (
  id: number,
  model: string,
  onDelete: (id: number) => Promise<void>
) => {
  Alert.alert(
    `Delete ${model}`,
    `Are you sure that you want to delete this ${model}?`,
    [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => onDelete(id) },
    ]
  );
};

export default DeleteAlert;
