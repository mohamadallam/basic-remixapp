import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Product } from "~/models/Product";
interface Props {
  product: Product;
}
export default function ActionAreaCard({ product }: Props) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={product.img}
          alt="green iguana"
        />
        <CardContent
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="h6" color="error">
            {product.price + "USD"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
