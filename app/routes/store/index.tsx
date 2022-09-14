// import shopStyles from "~/styles/Client/shop.css";

// export const links = () => [{ href: shopStyles, rel: "stylesheet" }];
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "~/components/Card";
import Typography from "@mui/material/Typography";
import { LoaderFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import { Product } from "~/models/Product";
export const loader: LoaderFunction = async () => {
  try {
    const products = await db.product.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
    });
    return {
      products,
    };
  } catch (e) {
    console.log(e);
    return {
      products: [],
    };
  }
};
export default function Shop() {
  const { products } = useLoaderData();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="left" component="h1" gutterBottom>
            Products
          </Typography>
        </Grid>
        {products.map((product: Product) => {
          return (
            <Grid key={product.id} item xs={10} sm={10} md={4}>
              <Card product={product} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
