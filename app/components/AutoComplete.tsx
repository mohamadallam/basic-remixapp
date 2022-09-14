import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { styled, alpha } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { useFetcher } from "@remix-run/react";
import { Product } from "~/models/Product";
const filter = createFilterOptions<Product>();
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = React.useState<Product | null>(null);
  const theme = useTheme();
  const fetch = useFetcher();

  React.useEffect(() => {
    fetch.load(`/api/serach`);
  }, []);
  console.log(fetch?.data);
  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (newValue && typeof newValue !== "string" && newValue.title) {
            setValue(newValue);
            window.location.replace("/store/product/" + newValue.id);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          return filtered;
        }}
        id="search-products"
        options={fetch?.data?.products || []}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => (
          <DialogOption attributes={props} product={option} />
        )}
        sx={{
          maxWidth: 300,
          width: "100%",
          display: { sm: "block", xs: "none" },
        }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              ...params.InputProps,
              style: {
                borderRadius: theme.shape.borderRadius,
                backgroundColor: alpha(theme.palette.common.white, 0.15),
                padding: "2px 6px",
                color: "white",
                width: "100%",
                border: "none",
              },

              endAdornment: (
                <IconButton>
                  <SearchIcon style={{ color: "white" }} />
                </IconButton>
              ),
            }}
          />
        )}
      />
    </React.Fragment>
  );
}

interface DialogOptionPropsInterface {
  attributes: React.HTMLAttributes<HTMLLIElement>;
  product: Product;
}

const LiOptionStyle = styled("li")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  textDecoration: "none",

  width: "100%",

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  "> p": {
    color: theme.palette.primary.main,
    fontSize: 16,
    padding: "0 10px",
    overflow: "hidden",
    display: "inline-block",
    textDecoration: "none",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));
export function DialogOption(props: DialogOptionPropsInterface) {
  return (
    <LiOptionStyle {...props.attributes}>
      <img src={props.product.img} width="50" height="50" />
      <p>{props.product.title}</p>
    </LiOptionStyle>
  );
}
