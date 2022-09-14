import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Table from "~/components/Admin/ProductsTable";
import Typography from "@mui/material/Typography";

export interface Product {
  name: string;
}

const rows: Product[] = [{ name: "P1 scsf csd" }];
export default function index() {
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Typography variant="h6">Dashboard</Typography>
    </Container>
  );
}
