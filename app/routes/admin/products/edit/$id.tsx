import {
  Typography,
  Paper,
  Grid,
  Button,
  Container,
  TextField,
} from "@mui/material";

import type { LoaderFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { redirect, ActionFunction, json } from "@remix-run/node"; // or cloudflare/deno
import { useActionData, useLoaderData } from "@remix-run/react";
import { createProduct, Product } from "~/models/Product";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const productExist = await db.product.findUnique({
    where: { id: id },
  });
  if (!productExist) throw new Error("Product not found");

  const { error, errors, product } = createProduct({
    title: formData.get("title") as string,
    price: formData.get("price") as string,
    img: formData.get("img") as string,
  });

  if (error || !product) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  }

  await db.product.update({
    where: { id: id },
    data: {
      title: product.title,
      price: product.price,
      img: product.img,
    },
  });
  return redirect(`/admin/products`);
};

type LoaderData = { product: Product };
export const loader: LoaderFunction = async ({ params }) => {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });
  if (!product) throw new Error("Product not found");
  const data: LoaderData = { product };
  return json(data);
};

export default function New() {
  const actionData = useActionData();
  const data = useLoaderData<LoaderData>();
  const title = actionData?.values?.title || data.product?.title || "";
  const price = actionData?.values?.title || data.product?.price || "";
  const img = actionData?.values?.title || data.product?.img || "";
  return (
    <Container sx={{ flexGrow: 1 }}>
      <div style={{ maxWidth: 600 }}>
        <Grid container rowSpacing={3}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h4" align="center" component="h1" gutterBottom>
              Edit Product
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <form method="POST">
              <input name="id" type="text" value={data?.product?.id} hidden />
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={8}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="title"
                      multiline
                      label="Title"
                      error={actionData?.errors?.title && true}
                      defaultValue={title}
                      helperText={actionData?.errors?.title || ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="price"
                      type="number"
                      label="Price"
                      error={actionData?.errors?.price && true}
                      defaultValue={price}
                      helperText={actionData?.errors?.price || ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="img"
                      type="text"
                      label="Image Url"
                      error={actionData?.errors?.img && true}
                      defaultValue={img}
                      helperText={actionData?.errors?.img || ""}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
