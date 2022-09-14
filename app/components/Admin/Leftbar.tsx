import { Container, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

import { Home } from "@mui/icons-material";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { Link } from "@remix-run/react";
const ContainerStyle = styled(Container)(({ theme }) => ({
  height: "100vh",
  color: "white",
  paddingTop: theme.spacing(10),
  backgroundColor: theme.palette.primary.main,
  position: "sticky",
  top: 0,
  border: "1px solid #ece7e7",
}));
const ItemStyle = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: "White",
  width: "100%",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    marginBottom: theme.spacing(3),
    cursor: "pointer",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
  padding: "10px 5px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
}));
const IconStyle = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    fontSize: "18px",
  },
}));
const TextStyle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Leftbar = () => {
  return (
    <ContainerStyle>
      <ItemStyle to="/store">
        <IconStyle>
          <LocalGroceryStoreIcon />
        </IconStyle>
        <TextStyle>Store</TextStyle>
      </ItemStyle>
      <ItemStyle to="/admin">
        <IconStyle>
          <Home />
        </IconStyle>
        <TextStyle>Dashboard</TextStyle>
      </ItemStyle>
      <ItemStyle to="/admin/products">
        <IconStyle>
          <ViewCompactIcon />
        </IconStyle>
        <TextStyle>Products</TextStyle>
      </ItemStyle>
    </ContainerStyle>
  );
};

export default Leftbar;
