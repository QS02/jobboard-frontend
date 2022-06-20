import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "../../../store";
import { useAuth } from "@hooks/use-auth";
import { updateApplication } from "@slices/application";

export const ApplicationOverview = (props) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { selectedApplication } = useSelector((state) => state.application);
  const [status, setStatus] = useState("pending");
  const [action, setAction] = useState("description");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setStatus(selectedApplication.status);
    if (selectedApplication.action) setAction(selectedApplication.action);
  }, [selectedApplication]);

  const onCancelReview = () => {
    router.push("/applications");
  };

  const onSubmitReview = async () => {
    if (status === "resubmit") {
      dispatch(updateApplication(id, { status, action }));
    } else {
      dispatch(updateApplication(id, { status }));
    }
    router.push("/applications");
  };

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item md={12} xs={12}></Grid>
          <Grid item md={12} xs={12}>
            <Typography variant="h6">Application Status</Typography>
            <Select
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"approved"}>Approved</MenuItem>
              <MenuItem value={"resubmit"}>Resubmit</MenuItem>
              <MenuItem value={"disapproved"}>Disapproved</MenuItem>
            </Select>
          </Grid>
          <Grid item md={12} xs={12} sx={{ mt: 2 }}>
            <Typography variant="h6">Action</Typography>
            <Select
              fullWidth
              value={action}
              onChange={(e) => setAction(e.target.value)}
              disabled={status !== "resubmit"}
            >
              <MenuItem value={"description"}>description</MenuItem>
              <MenuItem value={"attachments"}>attachments</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </CardContent>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 1,
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Button sx={{ m: 1 }} variant="outlined" onClick={onCancelReview}>
          Cancel
        </Button>
        <Button sx={{ m: 1 }} variant="contained" onClick={onSubmitReview}>
          Submit
        </Button>
      </Box>
    </Card>
  );
};
