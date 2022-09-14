import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "./AppBar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <AppBar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {children}
          {/* <Copyright /> */}
        </Box>
      </Container>
    </React.Fragment>
  );
}
