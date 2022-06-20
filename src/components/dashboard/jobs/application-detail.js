import { Fragment } from "react";
import Link from "next/link";
import { Box, Button, Card, Typography } from "@mui/material";
import { useAuth } from "@hooks/use-auth";

export const ApplicationDetail = (props) => {
  const { application, ...other } = props;
  const { user } = useAuth();

  return (
    <Card variant="outlined" {...other}>
      <Fragment>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            px: 2,
            py: 1.5,
          }}
        >
          <div>
            <Typography variant="subtitle1">{application.job.title}</Typography>
            <Typography color="subtitle2" variant="caption">
              {application.description}
            </Typography>
            <div>
              <Typography color="textSecondary" variant="caption">
                {`${application.attachments.length} attachments`} •{" "}
                {application.status}
              </Typography>
            </div>
          </div>
          <div>
            {user?.role === "admin" && (
              <>
                <Link href={`/applications/review/${application.id}`} passHref>
                  <Button variant="outlined" color="primary">
                    Review
                  </Button>
                </Link>
              </>
            )}
            {user?.role === "user" && application.status === "resubmit" && (
              <Link href={`/my-jobs/resubmit/${application.id}`} passHref>
                <Button variant="outlined" color="primary">
                  Resubmit
                </Button>
              </Link>
            )}
          </div>
        </Box>
      </Fragment>
    </Card>
  );
};
