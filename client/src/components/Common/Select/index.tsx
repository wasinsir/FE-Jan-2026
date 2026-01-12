import StyledSelect from "./styled";

interface OptionsProp {
  value?: string;
  label: string;
}

interface SelectProps {
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  options?: OptionsProp[];
}

const Select = (props: SelectProps) => {
  return (
    <StyledSelect onChange={props.onChange} value={props.value}>
      {props.options?.map((option) => (
        <option key={option.value} value={option.value} id={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
