import { NorthWest } from "@mui/icons-material";

export interface Product {
  img: string;
  price: number;
  title: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface FormProduct {
  img?: string;
  price?: string;
  title?: string;
}
export function createProduct(product: FormProduct) {
  const { img, price, title } = product;
  const errors: FormProduct = {};
  if (!img) {
    errors["img"] = "Required!";
  }
  if (!price) {
    errors["price"] = "Required!";
  } else if (isNaN(parseFloat(price))) {
    errors["price"] = "Price must be a number!";
  }

  if (!title) {
    errors["title"] = "Required!";
  }

  if (Object.keys(errors).length > 0) {
    return { product: null, errors, error: true };
  }
  if (img && price && title) {
    return {
      product: { img, price: parseFloat(price), title },
      errors,
      error: false,
    };
  }
  return { product: null, errors, error: true };
}
