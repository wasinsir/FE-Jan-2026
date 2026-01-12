import StyledButton from "./styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled, ...rest }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} {...rest}>
      {label}
    </StyledButton>
  );
};

export default Button;
