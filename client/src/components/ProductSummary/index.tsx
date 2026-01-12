import { useSelector } from "react-redux";
import { getProductsValue } from "../../store/ProductStore/ProductsSelector";

const ProductSummary = () => {
  const productsValue: number = useSelector(getProductsValue);

  return (
    <span style={{ marginInlineStart: "auto" }}>
      Total Products Value:{" "}
      {productsValue.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}{" "}
      Baht
    </span>
  );
};

export default ProductSummary;
