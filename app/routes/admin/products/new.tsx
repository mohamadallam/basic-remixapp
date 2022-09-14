import {
  Typography,
  Paper,
  Grid,
  Button,
  Container,
  TextField,
} from "@mui/material";
import { db } from "~/utils/db.server";
import { redirect, ActionFunction, json } from "@remix-run/node"; // or cloudflare/deno
import { useActionData } from "@remix-run/react";
import { createProduct } from "~/models/Product";
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const { error, errors, product } = createProduct({
    title: formData.get("title") as string,
    price: formData.get("price") as string,
    img: formData.get("img") as string,
  });

  if (error || !product) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  }

  await db.product.create({
    data: {
      title: product.title,
      price: product.price,
      img: product.img,
    },
  });
  return redirect(`/admin/products`);
};

export default function New() {
  const actionData = useActionData();
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
              Create Product
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <form method="POST">
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={8}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="title"
                      multiline
                      label="Title"
                      error={actionData?.errors?.title && true}
                      defaultValue={actionData?.values?.title || ""}
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
                      defaultValue={actionData?.values?.price || 0}
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
                      defaultValue={actionData?.values?.img || ""}
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
