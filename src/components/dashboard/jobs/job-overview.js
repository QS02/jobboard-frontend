import PropTypes from "prop-types";
import Markdown from "react-markdown";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const MarkdownWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  "& p": {
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    marginBottom: theme.spacing(2),
  },
}));

export const JobOverview = (props) => {
  const { job, ...other } = props;

  return (
    <div {...other}>
      <Typography variant="h5">{job.title}</Typography>
      <Box sx={{ mt: 3 }}>
        <MarkdownWrapper>
          {job.description && <Markdown children={job.description} />}
        </MarkdownWrapper>
      </Box>
    </div>
  );
};

JobOverview.propTypes = {
  job: PropTypes.object.isRequired,
};
