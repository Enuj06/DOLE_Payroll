import { Text, TextStyle } from "react-native";

type Props = {
  name: string;
  color?: string;
  className?: string;
  style?: TextStyle;  
};

const Label = ({ name, color = "black", className, style }: Props) => {
  return (
    <Text
      className={`mb-1 font-bold ${className || ""}`}
      style={[{ color }, style]}
    >
      {name}
    </Text>
  );
};

export default Label;
