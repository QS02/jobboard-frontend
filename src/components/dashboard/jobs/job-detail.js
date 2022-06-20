import { Fragment } from "react";
import Link from "next/link";
import { Box, Button, Card, Typography } from "@mui/material";
import { useAuth } from "@hooks/use-auth";

export const JobDetail = (props) => {
  const { job, ...other } = props;
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
            <Typography variant="subtitle1">{job.title}</Typography>
            <Typography color="subtitle2" variant="caption">
              {job.description}
            </Typography>
            <div>
              <Typography color="textSecondary" variant="caption">
                {`${job.applicants} applicants`} • {job.status}
              </Typography>
            </div>
          </div>
          <div>
            {user?.role === "admin" ? (
              <>
                <Link href={`/jobs/${job.id}`} passHref>
                  <Button variant="outlined" color="primary">
                    Update
                  </Button>
                </Link>
              </>
            ) : (
              <Link href={`/jobs/apply/${job.id}`} passHref>
                <Button variant="outlined" color="primary">
                  Apply
                </Button>
              </Link>
            )}
          </div>
        </Box>
      </Fragment>
    </Card>
  );
};
