import { Picker } from "@react-native-picker/picker";

type Props = {
  value: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  onChange: (value: string) => void;
};

const Select = ({
  value,
  options,
  placeholder = "Select Item",
  onChange,
}: Props) => {
  return (
    <Picker selectedValue={value} onValueChange={onChange}>
      <Picker.Item label={placeholder} value="" enabled={false} />
      {options.map((option) => (
        <Picker.Item
          key={option.value}
          label={option.label}
          value={option.value}
        />
      ))}
    </Picker>
  );
};

export default Select;
