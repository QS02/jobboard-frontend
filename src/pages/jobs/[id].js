import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "../../store";
import { getJob, createJob, updateJob } from "@slices/job";

import Head from "next/head";
import {
  Avatar,
  Box,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { Check as CheckIcon } from "../../icons/check";

const JobCreate = () => {
  const [complete, setComplete] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const { selectedJob } = useSelector((state) => state.job);

  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id !== "new") {
      dispatch(getJob(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedJob) {
      setTitle(selectedJob.title);
      setDescription(selectedJob.description);
      setStatus(selectedJob.status);
    }
  }, [selectedJob]);

  const onSubmit = () => {
    setComplete(true);
    if (id === "new") {
      dispatch(createJob({ title, description }));
    } else {
      dispatch(updateJob(id, { title, description, status }));
    }
  };

  const returnToJobs = () => {
    router.push("/jobs");
  };

  const postNewJob = () => {
    setComplete(false);
    setTitle("");
    setDescription("");
    router.push("/jobs/new");
  };

  return (
    <>
      <Head>
        <title>Dashboard: {id === "new" ? "Create" : "Update"} Job</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              p: {
                xs: 4,
                sm: 6,
                md: 8,
              },
            }}
          >
            <Box maxWidth="sm">
              <Typography sx={{ mb: 3 }} variant="h4">
                {id === "new" ? "Create" : "Update"} Job
              </Typography>
              {!complete ? (
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6">What is the job about?</Typography>
                    <TextField
                      fullWidth
                      required
                      label="Job Title"
                      name="jobTitle"
                      placeholder="e.g Salesforce Analyst"
                      sx={{ mt: 3 }}
                      xs={8}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6">
                      How would you describe the job post?
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      label="Job Description"
                      multiline
                      rows={8}
                      sx={{ mt: 3 }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                  {id !== "new" && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6">Job Status</Typography>
                      <Select
                        fullWidth
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"open"}>Open</MenuItem>
                        <MenuItem value={"closed"}>Closed</MenuItem>
                      </Select>
                    </Box>
                  )}
                  <Grid alignItems="center" container sx={{ mt: 3 }}>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      sx={{ mr: 2 }}
                      variant="outlined"
                      color="error"
                      onClick={returnToJobs}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={onSubmit}
                      disabled={!title.length || !description.length}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Box>
              ) : (
                <div>
                  <Avatar
                    sx={{
                      backgroundColor: "success.main",
                      color: "success.contrastText",
                      height: 40,
                      width: 40,
                    }}
                  >
                    <CheckIcon />
                  </Avatar>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    All done!
                  </Typography>
                  <Button
                    sx={{ mt: 3, mr: 2 }}
                    variant="contained"
                    onClick={returnToJobs}
                  >
                    Return to Jobs
                  </Button>
                  <Button
                    sx={{ mt: 3, mr: 2 }}
                    variant="contained"
                    onClick={postNewJob}
                  >
                    Post new Job
                  </Button>
                </div>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

JobCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default JobCreate;
