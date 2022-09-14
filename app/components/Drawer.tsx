import AutoComplete from "./AutoComplete";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "@remix-run/react";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
interface Props {
  open: boolean;
  onClose: (b: boolean) => void;
}
export default function TemporaryDrawer({ open, onClose }: Props) {
  const theme = useTheme();
  const list = () => (
    <Box
      sx={{ width: 250 }}
      component="div"
      style={{
        backgroundColor: theme.palette.primary.main,
        height: "100%",
        alignItems: "center",
        display: "flex",
      }}
    >
      <List sx={{ width: "100%" }}>
        {[
          { name: "Home", to: "/" },
          { name: "Admin", to: "/admin" },
        ].map((item, index) => (
          <ListItem key={index} sx={{ color: "white" }}>
            <ListItemButton component={Link} to={item.to}>
              {item.name}
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem key={333} sx={{ color: "white" }}>
          <AutoComplete />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={open} onClose={onClose}>
      {list()}
    </Drawer>
  );
}
