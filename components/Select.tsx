import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useImmer } from "use-immer";

type Props = {
  value: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

const Select = ({
  value,
  options,
  placeholder = "Select Item",
  onChange,
  onBlur,
}: Props) => {
  const [isFocused, setIsFocused] = useImmer(false);

  return (
    <View>
      <Dropdown
        data={options}
        labelField="label"
        valueField="value"
        placeholder={!isFocused ? placeholder : ""}
        value={value}
        onChange={(option) => {
          onChange(option.value);
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          onBlur && onBlur();
          setIsFocused(false);
        }}
      />
    </View>
  );
};

export default Select;
