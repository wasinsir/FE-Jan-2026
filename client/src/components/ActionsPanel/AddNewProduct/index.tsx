import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button";
import { useState } from "react";
import { add } from "../../../store/ProductStore/ProductsSlice";
import type { Product } from "../../../types/product";
import { getAllProductSKUs } from "../../../store/ProductStore/ProductsSelector";
import { FormContainer, FormError, FormItem } from "./styled";

const initialProductState: Product = {
  id: "",
  name: "",
  sku: "",
  price: 0,
  stock: 0,
  category: "Food",
  createdAt: "",
};

const initialErrorsState = {
  name: "",
  sku: "",
  price: "",
  stock: "",
  category: "",
};

const filterOption = [
  { value: "Food", label: "Food" },
  { value: "Beverages", label: "Beverages" },
  { value: "Household", label: "Household" },
  { value: "Clothing", label: "Clothing" },
  { value: "Books", label: "Books" },
];

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const existingProductSKUs: string[] = useSelector(getAllProductSKUs); // Replace with actual selector to get products from store
  const [errors, setErrors] = useState(initialErrorsState);
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product>(initialProductState);

  const validate = (newProduct?: Product) => {
    const productToValidate = newProduct || product;

    const newErrors = initialErrorsState;

    if (productToValidate.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    } else {
      newErrors.name = "";
    }

    if (!productToValidate.sku) {
      newErrors.sku = "Please enter SKU";
    } else if (
      existingProductSKUs.some((sku) => sku === productToValidate.sku)
    ) {
      newErrors.sku = "This SKU is already in use";
    } else {
      newErrors.sku = "";
    }

    if (productToValidate.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    } else {
      newErrors.price = "";
    }

    if (productToValidate.stock < 0) {
      newErrors.stock = "Stock must not be less than 0";
    } else {
      newErrors.stock = "";
    }

    if (!productToValidate.category) {
      newErrors.category = "Please select a category";
    } else {
      newErrors.category = "";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = () => {
    if (!validate()) return;

    dispatch(add(product));
    onClose();
  };

  const onClose = () => {
    setProduct(initialProductState);
    setErrors(initialErrorsState);
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newProduct = { ...product, [name]: value };
    setProduct(newProduct);
    validate(newProduct);
  };

  const isFormValid =
    product.name.length >= 3 &&
    product.sku &&
    product.price > 0 &&
    product.stock >= 0 &&
    product.category &&
    !existingProductSKUs.some((sku) => sku === product.sku);

  const form = isOpen && (
    <FormContainer onSubmit={handleSubmit}>
      <FormItem>
        <label>Product Name</label>
        <input name="name" value={product.name} onChange={handleChange} />
        {errors.name && <FormError>{errors.name}</FormError>}
      </FormItem>

      <FormItem>
        <label>SKU</label>
        <input name="sku" value={product.sku} onChange={handleChange} />
        {errors.sku && <FormError>{errors.sku}</FormError>}
      </FormItem>

      <FormItem>
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        {errors.price && <FormError>{errors.price}</FormError>}
      </FormItem>

      <FormItem>
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
        />
        {errors.stock && <FormError>{errors.stock}</FormError>}
      </FormItem>

      <FormItem>
        <label>Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
        >
          {filterOption?.map((option) => (
            <option key={option.value} value={option.value} id={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.category && <FormError>{errors.category}</FormError>}
      </FormItem>
      <Button label="Confirm" disabled={!isFormValid} type="submit" />
      <Button label="Cancel" onClick={onClose} />
    </FormContainer>
  );

  return (
    <>
      {form}
      <Button label="Add New Product" onClick={onOpen} />
    </>
  );
};

export default AddNewProduct;

// import { useState } from "react";

// export default function ProductForm() {
//   const [products, setProducts] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     sku: "",
//     price: "",
//     stock: "",
//     category: "",
//   });

//   const [errors, setErrors] = useState({});

//   // 🔍 Validate form
//   const validate = () => {
//     const newErrors = {};

//     if (form.name.trim().length < 3) {
//       newErrors.name = "ชื่อสินค้าต้องอย่างน้อย 3 ตัวอักษร";
//     }

//     if (!form.sku) {
//       newErrors.sku = "กรุณากรอก SKU";
//     } else if (products.some((p) => p.sku === form.sku)) {
//       newErrors.sku = "SKU นี้ถูกใช้แล้ว";
//     }

//     if (form.price <= 0) {
//       newErrors.price = "ราคาต้องมากกว่า 0";
//     }

//     if (form.stock < 0) {
//       newErrors.stock = "สต็อกต้องไม่น้อยกว่า 0";
//     }

//     if (!form.category) {
//       newErrors.category = "กรุณาเลือกหมวดหมู่";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setProducts([...products, form]);

//     // ✅ clear form after success
//     setForm({
//       name: "",
//       sku: "",
//       price: "",
//       stock: "",
//       category: "",
//     });

//     setErrors({});
//   };

//   const isFormValid =
//     form.name.length >= 3 &&
//     form.sku &&
//     form.price > 0 &&
//     form.stock >= 0 &&
//     form.category &&
//     !products.some((p) => p.sku === form.sku);

//   return (
//     <div>
//       <h2>เพิ่มสินค้า</h2>

//       <form onSubmit={handleSubmit}>
//         {/* Name */}
//         <div>
//           <label>ชื่อสินค้า</label>
//           <input name="name" value={form.name} onChange={handleChange} />
//           {errors.name && <p className="error">{errors.name}</p>}
//         </div>

//         {/* SKU */}
//         <div>
//           <label>SKU</label>
//           <input name="sku" value={form.sku} onChange={handleChange} />
//           {errors.sku && <p className="error">{errors.sku}</p>}
//         </div>

//         {/* Price */}
//         <div>
//           <label>ราคา</label>
//           <input
//             type="number"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//           />
//           {errors.price && <p className="error">{errors.price}</p>}
//         </div>

//         {/* Stock */}
//         <div>
//           <label>สต็อก</label>
//           <input
//             type="number"
//             name="stock"
//             value={form.stock}
//             onChange={handleChange}
//           />
//           {errors.stock && <p className="error">{errors.stock}</p>}
//         </div>

//         {/* Category */}
//         <div>
//           <label>หมวดหมู่</label>
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//           >
//             <option value="">-- เลือกหมวดหมู่ --</option>
//             <option value="electronics">Electronics</option>
//             <option value="clothing">Clothing</option>
//             <option value="food">Food</option>
//           </select>
//           {errors.category && <p className="error">{errors.category}</p>}
//         </div>

//         {/* Submit */}
//         <button type="submit" disabled={!isFormValid}>
//           เพิ่มสินค้า
//         </button>
//       </form>

//       {/* Product List */}
//       <h3>รายการสินค้า</h3>
//       <ul>
//         {products.map((p, index) => (
//           <li key={index}>
//             {p.name} ({p.sku}) - {p.price}฿ | Stock: {p.stock}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
