import { combineReducers } from "@reduxjs/toolkit";
import { reducer as jobReducer } from "../slices/job";
import { reducer as applicationReducer } from "../slices/application";

export const rootReducer = combineReducers({
  job: jobReducer,
  application: applicationReducer,
});
