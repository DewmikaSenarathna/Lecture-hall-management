import API from "../api/axiosClient";

const hodService = {

  getDashboardSummary: async () => {
    const res = await API.get("/hod/dashboard");
    return res.data;
  },

  getPendingRequests: async () => {
    const res = await API.get("/hod/pending");
    return res.data;
  },

  updateRequestStatus: async (id, status) => {
    const res = await API.put(`/hod/request/${id}`, { status });
    return res.data;
  },

  getHistory: async () => {
    const res = await API.get("/hod/history");
    return res.data;
  },

  getNotices: async () => {
    const res = await API.get("/hod/notices");
    return res.data;
  },

  createNotice: async (data) => {
    const res = await API.post("/hod/notices", data);
    return res.data;
  },

  updateNotice: async (id, data) => {
    const res = await API.put(`/hod/notices/${id}`, data);
    return res.data;
  },

  deleteNotice: async (id) => {
    const res = await API.delete(`/hod/notices/${id}`);
    return res.data;
  },

  sendDecisionNotification: async ({ lecturerId, bookingId, status }) => {
    const res = await API.post("/hod/decision-notification", {
      lecturerId,
      bookingId,
      status,
    });
    return res.data;
  },

  bookHall: async (data) => {
    const res = await API.post("/hod/book-hall", data);
    return res.data;
  }

};

export default hodService;