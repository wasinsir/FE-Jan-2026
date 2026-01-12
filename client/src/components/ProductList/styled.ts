import styled from "styled-components";

export const TableContainer = styled.table`
  border-collapse: collapse;
  margin: 16px 0px;
`;
export const TableHeader = styled.thead`
  background-color: #2898cb;
  color: #ffffff;
`;

export const TableRow = styled.tr<{ outOfStock?: boolean }>`
  background-color: ${(props) => (props.outOfStock ? "#ffb09c" : "unset")};
`;

export const TableCell = styled.td<{ lowStock?: boolean }>`
  border: 1px black solid;
  padding: 4px;
  text-align: center;
  ${(props) => (props.lowStock ? "font-weight: bold; color: #ee2400;" : "")}
`;
