import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "@remix-run/react";
import { Product } from "~/models/Product";

export interface Props {
  products: Product[];
  handleDeleteProduct: (id: string) => void;
}
export default function DenseTable({ products, handleDeleteProduct }: Props) {
  const deleteIcon = (id: string) => (
    <Link to={"/admin/products/delete/" + id}>
      <IconButton
        onClick={() => console.log("edited")}
        style={{ marginRight: 10 }}
      >
        <DeleteIcon color="error" />
      </IconButton>
    </Link>
  );

  const editIcon = (id: string) => (
    <Link to={"/admin/products/edit/" + id}>
      <IconButton
        onClick={() => console.log("edited")}
        style={{ marginRight: 10 }}
      >
        <EditIcon color="primary" />
      </IconButton>
    </Link>
  );

  return (
    <TableContainer component={Paper} elevation={8}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">price</TableCell>

            <TableCell align="left">img</TableCell>
            <TableCell align="left">createdAt</TableCell>
            <TableCell align="left">updatedAt</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, index) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.price}</TableCell>

              <TableCell align="left">
                <img src={row.img} width={50} height={50} />
              </TableCell>
              <TableCell align="left">
                {new Date(row.createdAt).toDateString()}
              </TableCell>
              <TableCell align="left">
                {new Date(row.updatedAt).toDateString()}
              </TableCell>
              <TableCell component="th" scope="row" sx={{ display: "flex" }}>
                {editIcon(row.id)}
                {deleteIcon(row.id)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
