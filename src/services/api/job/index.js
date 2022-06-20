import { webApi } from "@api/config";

/**
 * Job
 */
class JobApi {
  getJobs = (params) => webApi({ auth: true }).get("/jobs", params);
  createJob = (body) => webApi({ auth: true }).post("/jobs", body);
  updateJob = (id, body) => webApi({ auth: true }).patch(`/jobs/${id}`, body);
  getJob = (id) => webApi({ auth: true }).get(`/jobs/${id}`);
  deleteJob = (id) => webApi({ auth: true }).delete(`/jobs/${id}`);
}

export const jobApi = new JobApi();
