import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import mangesh from "../profile/mangesh.jpg";
import Chip from "@mui/material/Chip";
import { sx } from "@mui/system";

export default function SizeAvatars() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        avatar={<Avatar alt="Natacha" src={mangesh} />}
        label="Hi user"
        variant="outlined"
        color="primary"
        sx={{
          typography: { color: "white" },
        }}
      />
    </Stack>
  );
}
