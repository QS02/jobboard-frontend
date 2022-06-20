import { createSlice } from "@reduxjs/toolkit";
import { jobApi } from "../services/api/job";

const initialState = {
  jobs: [],
  selectedJob: null,
  page: 1,
  totalPages: 0,
  totalResults: 0,
};

const slice = createSlice({
  name: "job",
  initialState,
  reducers: {
    getJobs(state, action) {
      const { page, results, totalPages, totalResults } = action.payload;
      state.jobs = results;
      state.page = page;
      state.totalPages = totalPages;
      state.totalResults = totalResults;
    },
    getPaginatedJobs(state, action) {
      const { page, results, totalPages, totalResults } = action.payload;
      state.jobs = [...state.jobs, ...results];
      state.page = page;
      state.totalPages = totalPages;
      state.totalResults = totalResults;
    },
    getJob(state, action) {
      state.selectedJob = action.payload;
    },
    createJob(state, action) {
      state.jobs = [action.payload, ...state.jobs];
    },
    updateJob(state, action) {
      const job = action.payload;

      state.jobs = state.jobs.map((_job) => {
        if (_job.id === job.id) {
          return job;
        }

        return _job;
      });
    },
    deleteJob(state, action) {
      state.jobs = state.jobs.filter((_job) => _job.id !== action.payload);
    },
  },
});

export const { reducer } = slice;

export const getJobs = () => async (dispatch) => {
  const { data } = await jobApi.getJobs({});
  dispatch(slice.actions.getJobs(data));
};

export const getJob = (id) => async (dispatch) => {
  const { data } = await jobApi.getJob(id);
  dispatch(slice.actions.getJob(data));
};

export const getPaginatedJobs = (params) => async (dispatch) => {
  const { data } = await jobApi.getJobs(params);
  dispatch(slice.actions.getPaginatedJobs(data));
};

export const createJob = (createData) => async (dispatch) => {
  const { data } = await jobApi.createJob(createData);

  dispatch(slice.actions.createJob(data));
};

export const updateJob = (id, updateData) => async (dispatch) => {
  const { data } = await jobApi.updateJob(id, updateData);

  dispatch(slice.actions.updateJob(data));
};

export const deleteJob = (id) => async (dispatch) => {
  await jobApi.deleteJob(id);

  dispatch(slice.actions.deleteJob(id));
};
