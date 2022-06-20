import { Box, Card, Input } from "@mui/material";
import { Search as SearchIcon } from "../../../icons/search";

export const JobFilter = (props) => {
  return (
    <Card {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          p: 2,
        }}
      >
        <SearchIcon fontSize="small" />
        <Box
          sx={{
            flexGrow: 1,
            ml: 3,
          }}
        >
          <Input disableUnderline fullWidth placeholder="Enter a keyword" />
        </Box>
      </Box>
    </Card>
  );
};
