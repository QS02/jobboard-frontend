import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "../../../store";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { JobOverview } from "@components/dashboard/jobs/job-overview";
import { JobApplyForm } from "@components/dashboard/jobs/job-apply";
import { getJob } from "@slices/job";

const JobApplyPage = () => {
  const dispatch = useDispatch();
  const { selectedJob } = useSelector((state) => state.job);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id !== "new") {
      dispatch(getJob(id));
    }
  }, [id]);

  if (!selectedJob) {
    return null;
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/jobs" passHref>
              <Link
                color="textPrimary"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Jobs</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardContent>
                  {selectedJob && <JobOverview job={selectedJob} />}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <JobApplyForm />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

JobApplyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default JobApplyPage;
