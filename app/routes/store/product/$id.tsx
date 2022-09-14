import type { LoaderFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";
import Card from "@mui/material/Card";
import { Grid, Container } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
export const loader: LoaderFunction = async ({ params }) => {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });
  if (!product) throw new Error("Product not found");

  return product;
};

export default function ActionAreaCard() {
  const product = useLoaderData();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={8}>
        <Typography gutterBottom variant="h3" component="div">
          Product
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Card sx={{ minWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={product.img}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="h6" color="error">
                {product.price + "USD"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
