import { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FileDropzone } from "../../file-dropzone";
import { useDispatch, useSelector } from "../../../store";
import { useAuth } from "@hooks/use-auth";
import { updateApplication } from "@slices/application";

export const ApplicationResubmit = (props) => {
  const { user } = useAuth();
  const { application } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const [description, setDescription] = useState(application.description);
  const [files, setFiles] = useState([]);

  const onCancelResubmit = () => {
    router.push("/my-jobs");
  };

  const onResubmit = () => {
    const formData = {
      job: application.job.id,
      user: application.user.id,
      status: "pending",
    };

    if (application.action === "description") {
      dispatch(updateApplication(id, { ...formData, description }));
    } else {
      dispatch(updateApplication(id, { ...formData, attachments: files }));
    }
    toast.success("Job applied successfully!");
    router.push("/my-jobs").catch(console.error);
  };

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  if (user.role === "admin") {
    return null;
  }

  return (
    <Card>
      {application && application.action === "description" ? (
        <CardContent>
          <Typography variant="h6">Resubmit Proposal</Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Proposal"
                name="description"
                multiline
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      ) : (
        <CardContent>
          <Typography variant="h6">Resubmit Files</Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item md={12} xs={12}>
              <FileDropzone
                accept={{
                  "application/pdf": [],
                  "application/msword": [],
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [],
                }}
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </Grid>
          </Grid>
        </CardContent>
      )}

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Button sx={{ m: 1 }} variant="outlined" onClick={onCancelResubmit}>
          Cancel
        </Button>
        <Button
          sx={{ m: 1 }}
          type="submit"
          variant="contained"
          onClick={onResubmit}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
};

ApplicationResubmit.propTypes = {
  application: PropTypes.object.isRequired,
};
