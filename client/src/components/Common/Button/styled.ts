import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#a0a0a0" : "#2898cb")};
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export default StyledButton;
