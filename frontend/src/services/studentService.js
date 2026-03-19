import API from "../api/axiosClient";

const studentService = {
  getProfile: async () => {
    const response = await API.get(`/users/me`);
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await API.put(`/users/me`, data);
    return response.data;
  },
};

export default studentService;