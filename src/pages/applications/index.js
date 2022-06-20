import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
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
import { AuthGuard } from "@components/authentication/auth-guard";
import { DashboardLayout } from "@components/dashboard/dashboard-layout";
import { JobFilter } from "@components/dashboard/jobs/job-filter";
import { ApplicationDetail } from "@components/dashboard/jobs/application-detail";

import { ChevronLeft as ChevronLeftIcon } from "../../icons/chevron-left";
import { ChevronRight as ChevronRightIcon } from "../../icons/chevron-right";
import { getApplications, getPaginatedApplications } from "@slices/application";
import { useDispatch, useSelector } from "../../store";

const ApplicationsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { applications, page, totalPages } = useSelector(
    (state) => state.application
  );

  useEffect(
    () => {
      dispatch(getApplications());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const loadPagenatedApplications = () => {
    dispatch(getPaginatedApplications({ page: page + 1, limit: 10 }));
  };

  return (
    <>
      <Head>
        <title>Dashboard: My Jobs</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mt: 4 }}>
            <JobFilter />
          </Box>
          <div>
            <InfiniteScroll
              dataLength={applications.length}
              next={loadPagenatedApplications}
              hasMore={page < totalPages}
              loader={<h3> Loading...</h3>}
              endMessage={<h4>Nothing more to show</h4>}
            >
              {applications.map((application) => (
                <Card key={application.id} sx={{ mt: 4 }}>
                  <CardContent>
                    <Box sx={{ mt: 2 }}>
                      <ApplicationDetail application={application} />
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

ApplicationsPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ApplicationsPage;
