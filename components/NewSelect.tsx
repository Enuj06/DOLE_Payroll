import { Picker } from "@react-native-picker/picker";

type Props = {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

const NewSelect = ({ value, options, onChange }: Props) => {
  return (
    <Picker selectedValue={value} onValueChange={onChange}>
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

export default NewSelect;
