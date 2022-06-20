import { useCallback, useEffect, useState } from "react";
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
import { ProposalOverview } from "@components/dashboard/jobs/proposal-overview";
import { ApplicationOverview } from "@components/dashboard/jobs/application-overview";
import { useMounted } from "@hooks/use-mounted";
import { getApplication } from "@slices/application";

const ApplicationReviewPage = () => {
  const dispatch = useDispatch();
  const { selectedApplication } = useSelector((state) => state.application);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(getApplication(id));
  }, [id]);

  if (!selectedApplication) {
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
            <NextLink href="/applications" passHref>
              <Link
                color="textPrimary"
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">Applications</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2">Job</Typography>
                  <Divider sx={{ my: 4 }} />
                  {selectedApplication && (
                    <JobOverview job={selectedApplication.job} />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Proposal</Typography>
                  <Divider sx={{ my: 4 }} />
                  {selectedApplication && (
                    <ProposalOverview application={selectedApplication} />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <ApplicationOverview selectedApplication={selectedApplication} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

ApplicationReviewPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ApplicationReviewPage;
