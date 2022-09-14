import Box from "@mui/material/Box";
import { Container, Button, Grid } from "@mui/material";
import Table from "~/components/Admin/ProductsTable";
import Typography from "@mui/material/Typography";
import { Link } from "@remix-run/react";
import {
  redirect,
  ActionFunction,
  LoaderFunction,
  json,
} from "@remix-run/node";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
export const loader: LoaderFunction = async () => {
  const products = await db.product.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
  });
  return {
    products,
  };
};

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const id = formData.get("id") as string;
//   const productExist = await db.product.findUnique({
//     where: { id: id },
//   });
//   if (!productExist) {
//     return json({ msg: "Product not found", error: true });
//   }

//   await db.product.delete({
//     where: { id: id },
//   });
//   return redirect(`/admin/products`);
// };
export default function index() {
  const { products } = useLoaderData();
  // const handleDeleteProduct = (id: string) => {
  //   const data = new FormData();
  //   data.append("id", id);
  //   data.append("_method", "delete");
  //   fetch("/admin/products", {
  //     body: JSON.stringify({ _method: "delete", id }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "post",
  //   });
  // };
  return (
    <Grid container rowSpacing={3} alignItems="center" justifyContent="center">
      <Grid
        item
        xs={10}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h4" align="left" component="h1" gutterBottom>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          component={Link}
          to={"/admin/products/new"}
        >
          Add Product
        </Button>
      </Grid>
      <Grid item xs={10}>
        <Table products={products} handleDeleteProduct={() => {}} />
      </Grid>
    </Grid>
  );
}
