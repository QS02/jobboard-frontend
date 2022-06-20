import PropTypes from "prop-types";
import Markdown from "react-markdown";
import {
  Box,
  Divider,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const MarkdownWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  "& p": {
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    marginBottom: theme.spacing(2),
  },
}));

export const ProposalOverview = (props) => {
  const { application, ...other } = props;

  return (
    <div {...other}>
      <Typography variant="p">Applied by {application.user.name}</Typography>
      <Box sx={{ mt: 3 }}>
        <MarkdownWrapper>
          {application.job.description && (
            <Markdown children={application.description} />
          )}
        </MarkdownWrapper>
      </Box>
      <Box sx={{ mt: 3 }}>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Attached Files
              <Divider />
            </ListSubheader>
          }
        >
          {application.attachments.map((attachment) => (
            <a
              key={attachment.path}
              href={`/${attachment.path}`}
              target="_blank"
              rel="noreferrer"
            >
              <ListItemButton>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText primary={attachment.filename} />
              </ListItemButton>
            </a>
          ))}
        </List>
      </Box>
    </div>
  );
};

ProposalOverview.propTypes = {
  application: PropTypes.object.isRequired,
};
