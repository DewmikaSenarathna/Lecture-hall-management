import API from "../api/axiosClient";

const studentService = {
  getProfile: async (studentId) => {
    const response = await API.get(`/student/${studentId}/profile`);
    return response.data;
  },

  updateProfile: async (studentId, data) => {
    const response = await API.put(`/student/${studentId}/profile`, data);
    return response.data;
  },
};

export default studentService;