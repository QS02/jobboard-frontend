import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@hooks/use-auth";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { JobFilter } from "../../components/dashboard/jobs/job-filter";
import { JobDetail } from "@components/dashboard/jobs/job-detail";

import { ChevronLeft as ChevronLeftIcon } from "../../icons/chevron-left";
import { ChevronRight as ChevronRightIcon } from "../../icons/chevron-right";
import { getJobs, getPaginatedJobs } from "@slices/job";
import { useDispatch, useSelector } from "../../store";

const JobBrowse = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const { jobs, page, totalPages } = useSelector((state) => state.job);

  useEffect(
    () => {
      dispatch(getJobs());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const loadPagenatedJobs = () => {
    dispatch(getPaginatedJobs({ page: page + 1, limit: 10 }));
  };

  const onJobPostButtonClick = () => {
    router.push("/jobs/new");
  };

  return (
    <>
      <Head>
        <title>Dashboard: Jobs</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="md">
          {user?.role === "admin" && (
            <Grid
              alignItems="center"
              container
              sx={{
                backgroundColor: "neutral.900",
                borderRadius: 1,
                color: "#FFFFFF",
                px: 4,
                py: 2,
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="secondary"
                size="large"
                variant="contained"
                onClick={onJobPostButtonClick}
              >
                Post a job
              </Button>
            </Grid>
          )}

          <Box sx={{ mt: 4 }}>
            <JobFilter />
          </Box>
          <div>
            <InfiniteScroll
              dataLength={jobs.length}
              next={loadPagenatedJobs}
              hasMore={page < totalPages}
              loader={<h3> Loading...</h3>}
              endMessage={<h4>Nothing more to show</h4>}
            >
              {jobs.map((job) => (
                <Card key={job.id} sx={{ mt: 4 }}>
                  <CardContent>
                    <Box sx={{ mt: 2 }}>
                      <JobDetail job={job} />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </InfiniteScroll>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
              px: 3,
              py: 2,
            }}
          >
            <IconButton disabled>
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </>
  );
};

JobBrowse.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default JobBrowse;
