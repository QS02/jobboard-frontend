import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FileDropzone } from "../../file-dropzone";
import { useDispatch, useSelector } from "../../../store";
import { useAuth } from "@hooks/use-auth";
import { createApplication } from "@slices/application";

export const JobApplyForm = (props) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [files, setFiles] = useState([]);
  const formik = useFormik({
    initialValues: {
      description: "",
      attachments: [],
    },
    validationSchema: Yup.object({
      description: Yup.string().max(5000),
      attachments: Yup.array(),
    }),

    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          job: id,
          user: user.id,
          ...values,
          attachments: files,
        };
        dispatch(createApplication(formData));
        // NOTE: Make API request
        toast.success("Job applied successfully!");
        router.push("/my-jobs").catch(console.error);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    },
  });

  const onCancelApply = () => {
    router.push("/jobs");
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                error={Boolean(
                  formik.touched.description && formik.errors.description
                )}
                helperText={
                  formik.touched.description && formik.errors.description
                }
                label="Proposal"
                name="description"
                multiline
                rows={5}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
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
      </Card>

      <Box
        sx={{
          display: "flex",
          mx: -1,
          mb: -1,
          mt: 3,
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Button sx={{ m: 1 }} variant="outlined" onClick={onCancelApply}>
          Cancel
        </Button>
        <Button sx={{ m: 1 }} type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
};
