import { Text } from "react-native";

type Props = {
  name: string;
  color?: string;
};

const Label = ({ name, color = "black" }: Props) => {
  return <Text className={`mb-1 font-b text-${color}`}>{name}</Text>;
};

export default Label;
