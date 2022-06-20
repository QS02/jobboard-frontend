import { webApi } from "@api/config";

/**
 * Job Application
 */
class ApplicationApi {
  getApplications = (params) =>
    webApi({ auth: true }).get("/applications", params);
  createApplication = (body) =>
    webApi({ auth: true }).post("/applications", body, {
      formData: true,
    });
  updateApplication = (id, body) =>
    webApi({ auth: true }).patch(`/applications/${id}`, body, {
      formData: true,
    });
  getApplication = (id) => webApi({ auth: true }).get(`/applications/${id}`);
  deleteApplication = (id) =>
    webApi({ auth: true }).delete(`/applications/${id}`);
}

export const applicationApi = new ApplicationApi();
