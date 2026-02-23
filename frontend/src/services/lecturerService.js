import API from "../api/axiosClient";

/*const lecturerService = {
  getDashboardSummary: async (lecturerId) => {
    const response = await API.get(
      `/lecturer/${lecturerId}/dashboard-summary`
    );
    return response.data;
  },

  getRecentBookings: async (lecturerId) => {
    const response = await API.get(
      `/lecturer/${lecturerId}/recent-bookings`
    );
    return response.data;
  },
};

export default lecturerService;*/









// src/services/lecturerService.js

const isBackendAvailable = false; 

const lecturerService = {

  getDashboardSummary: async (lecturerId) => {

    if (!isBackendAvailable) {
      //  Mock API response (simulates real backend)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            pendingRequests: 3,
            approvedBookings: 12,
            activeNotices: 5,
            monthlyBookings: 18,
          });
        }, 500);
      });
    }

    //  Real API call (future)
    const response = await API.get(
      `/lecturer/${lecturerId}/dashboard-summary`
    );
    return response.data;
  },

  getRecentBookings: async (lecturerId) => {

    if (!isBackendAvailable) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              subject: "Software Engineering",
              hall: "Hall A101",
              date: "2026-01-25",
              time: "10:00 AM",
              status: "Approved",
            },
            {
              id: 2,
              subject: "Database Systems",
              hall: "Hall B205",
              date: "2026-01-26",
              time: "2:00 PM",
              status: "Pending",
            },
          ]);
        }, 500);
      });
    }

    const response = await API.get(
      `/lecturer/${lecturerId}/recent-bookings`
    );
    return response.data;
  },

};

export default lecturerService;