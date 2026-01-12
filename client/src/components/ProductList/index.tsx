import { useDispatch, useSelector } from "react-redux";
import { getFilteredProducts } from "../../store/ProductStore/ProductsSelector";
import type { Product } from "../../types/product";
import { TableCell, TableContainer, TableHeader, TableRow } from "./styled";
import Button from "../Common/Button";
import { update } from "../../store/ProductStore/ProductsSlice";

const ProductTable = () => {
  const dispatch = useDispatch();
  const products: Product[] = useSelector(getFilteredProducts);
  if (!products || products.length === 0) {
    return (
      <TableContainer>
        <TableHeader />
        <tbody>
          <TableRow key={0}>
            <TableCell colSpan={6}>No products available</TableCell>
          </TableRow>
        </tbody>
      </TableContainer>
    );
  }

  const renderHeader = () => {
    return (
      <TableHeader>
        <TableRow key={0}>
          <TableCell>SKU</TableCell>
          <TableCell>Product name</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Stock</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
    );
  };

  const renderBody = () => {
    const rows = products.map((product) => {
      const isLowStock = product.stock < 10;
      const isOutOfStock = product.stock <= 0;
      // NOTED: Is out of stock also considered as low stock?
      const onSaleClick = () => {
        if (isOutOfStock) return;

        if (Math.random() < 0.5) {
          alert("Failed to process sale. Please try again.");
          return;
        } else {
          alert("Sale processed successfully.");
          const newProduct = { ...product, stock: product.stock - 1 };
          return dispatch(update(newProduct));
        }
      };
      return (
        <TableRow
          key={product.id}
          outOfStock={isOutOfStock}
          data-testid={`product-row-${product.id}`}
        >
          <TableCell data-testid={`product-sku-${product.id}`}>
            {product.sku}
          </TableCell>
          <TableCell data-testid={`product-name-${product.id}`}>
            {product.name}
          </TableCell>
          <TableCell data-testid={`product-category-${product.id}`}>
            {product.category}
          </TableCell>
          <TableCell data-testid={`product-price-${product.id}`}>
            {product.price}
          </TableCell>
          <TableCell
            lowStock={isLowStock && !isOutOfStock}
            data-testid={`product-stock-${product.id}`}
          >
            {product.stock}
          </TableCell>
          <TableCell>
            <Button
              label="Sale"
              data-testid={`product-sale-${product.id}`}
              onClick={onSaleClick}
              disabled={isOutOfStock}
            />
          </TableCell>
        </TableRow>
      );
    });

    return <tbody>{rows}</tbody>;
  };
  return (
    <TableContainer>
      {renderHeader()}
      {renderBody()}
    </TableContainer>
  );
};

export default ProductTable;
