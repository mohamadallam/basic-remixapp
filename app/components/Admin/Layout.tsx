import React from "react";
import { Outlet } from "@remix-run/react";
import { Grid, Container } from "@mui/material";
import Leftbar from "./Leftbar";
import Navbar from "./NavBar";
import { useTheme } from "@mui/material/styles";

const App: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container>
        <Navbar />
        <Grid item sm={2} xs={2} md={2} lg={2}>
          <Leftbar />
        </Grid>
        <Grid
          style={{ paddingTop: theme.spacing(3) }}
          item
          xs={10}
          sm={10}
          md={10}
          lg={10}
        >
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export interface ChildrenInterface {
  children?: JSX.Element | JSX.Element[];
}
export default App;
