import { useDispatch, useSelector } from "react-redux";
import { getSelectedFilter } from "../../store/ProductStore/ProductsSelector";
import Select from "../Common/Select";
import { ActionsContainer } from "./styled";
import { updateFilter } from "../../store/ProductStore/ProductsSlice";
import type { ProductCategory } from "../../types/product";
import AddNewProduct from "./AddNewProduct";

const ActionsPanel = () => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector(getSelectedFilter);

  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === "" ? undefined : event.target.value;
    dispatch(updateFilter(value as ProductCategory));
  };

  const filterOption = [
    { value: "", label: "All Categories" },
    { value: "Food", label: "Food" },
    { value: "Beverages", label: "Beverages" },
    { value: "Household", label: "Household" },
    { value: "Clothing", label: "Clothing" },
    { value: "Books", label: "Books" },
  ];

  return (
    <ActionsContainer>
      <AddNewProduct />
      <Select
        options={filterOption}
        value={selectedFilter}
        onChange={onFilterChange}
      />
    </ActionsContainer>
  );
};

export default ActionsPanel;
