import { createSlice } from "@reduxjs/toolkit";
import { applicationApi } from "../services/api/application";

const initialState = {
  applications: [],
  selectedApplication: null,
  page: 1,
  totalPages: 0,
  totalResults: 0,
};

const slice = createSlice({
  name: "application",
  initialState,
  reducers: {
    getApplications(state, action) {
      const { page, results, totalPages, totalResults } = action.payload;
      state.applications = results;
      state.page = page;
      state.totalPages = totalPages;
      state.totalResults = totalResults;
    },
    getPaginatedApplications(state, action) {
      const { page, results, totalPages, totalResults } = action.payload;
      state.applications = [...state.applications, ...results];
      state.page = page;
      state.totalPages = totalPages;
      state.totalResults = totalResults;
    },
    getApplication(state, action) {
      state.selectedApplication = action.payload;
    },
    createApplication(state, action) {
      state.applications = [action.payload, ...state.applications];
    },
    updateApplication(state, action) {
      const application = action.payload;

      state.applications = state.applications.map((_application) => {
        if (_application.id === application.id) {
          return application;
        }

        return _application;
      });
    },
    deleteApplication(state, action) {
      state.applications = state.applications.filter(
        (_application) => _application.id !== action.payload
      );
    },
  },
});

export const { reducer } = slice;

export const getApplications = () => async (dispatch) => {
  const { data } = await applicationApi.getApplications({});
  dispatch(slice.actions.getApplications(data));
};

export const getApplication = (id) => async (dispatch) => {
  const { data } = await applicationApi.getApplication(id);
  dispatch(slice.actions.getApplication(data));
};

export const getPaginatedApplications = (params) => async (dispatch) => {
  const { data } = await applicationApi.getApplications(params);
  dispatch(slice.actions.getPaginatedApplications(data));
};

export const createApplication = (createData) => async (dispatch) => {
  const { data } = await applicationApi.createApplication(createData);

  dispatch(slice.actions.createApplication(data));
};

export const updateApplication = (id, updateData) => async (dispatch) => {
  const { data } = await applicationApi.updateApplication(id, updateData);

  dispatch(slice.actions.updateApplication(data));
};

export const deleteApplication = (id) => async (dispatch) => {
  await applicationApi.deleteApplication(id);

  dispatch(slice.actions.deleteApplication(id));
};
