// lib/services.js
import axiosClient, { createServerAxiosClient } from "./axios";
import { ENDPOINTS } from "@/app/constants/endpoint";

// Generic service creator function that works on both client and server side
const createService = (axiosInstance) => {
  return {
    // Faculty service
    faculty: {
      getAll: () => axiosInstance.get(ENDPOINTS.FACULTY.GET_ALL),
      getOne: (id) => axiosInstance.get(ENDPOINTS.FACULTY.GET_ONE(id)),
      create: (data) => axiosInstance.post(ENDPOINTS.FACULTY.CREATE, data),
    },

    // Level service
    level: {
      getAll: () => axiosInstance.get(ENDPOINTS.LEVEL.GET_ALL),
      getOne: (id) => axiosInstance.get(ENDPOINTS.LEVEL.GET_ONE(id)),
      create: (data) => axiosInstance.post(ENDPOINTS.LEVEL.CREATE, data),
    },

    // Class Schedule service
    classSchedule: {
      getAll: () => axiosInstance.get(ENDPOINTS.CLASS_SCHEDULE.GET_ALL),
      getByCourses: (courseIds) =>
        axiosInstance.get(ENDPOINTS.CLASS_SCHEDULE.GET_BY_COURSES, {
          params: { courseIds },
        }),
      getOne: (id) => axiosInstance.get(ENDPOINTS.CLASS_SCHEDULE.GET_ONE(id)),
      create: (data) =>
        axiosInstance.post(ENDPOINTS.CLASS_SCHEDULE.CREATE, data),
      update: (id, data) =>
        axiosInstance.put(ENDPOINTS.CLASS_SCHEDULE.UPDATE(id), data),
      delete: (id) => axiosInstance.delete(ENDPOINTS.CLASS_SCHEDULE.DELETE(id)),
    },

    // Department service
    department: {
      getAll: (facultyId) =>
        axiosInstance.get(ENDPOINTS.DEPARTMENT.GET_ALL(facultyId)),
      getOne: (facultyId, id) =>
        axiosInstance.get(ENDPOINTS.DEPARTMENT.GET_ONE(facultyId, id)),
      create: (facultyId, data) =>
        axiosInstance.post(ENDPOINTS.DEPARTMENT.CREATE(facultyId), data),
    },

    // Course service
    course: {
      getAll: (departmentId) =>
        axiosInstance.get(ENDPOINTS.COURSE.GET_ALL(departmentId)),
      getOne: (departmentId, id) =>
        axiosInstance.get(ENDPOINTS.COURSE.GET_ONE(departmentId, id)),
      create: (departmentId, data) =>
        axiosInstance.post(ENDPOINTS.COURSE.CREATE(departmentId), data),
    },

    // Authentication service
    auth: {
      login: (credentials) =>
        axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials),
      register: (userData) =>
        axiosInstance.post(ENDPOINTS.AUTH.REGISTER, userData),
      resetPassword: (data) =>
        axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, data),
      changePassword: (data) =>
        axiosInstance.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, data),
      generateResetToken: (email) =>
        axiosInstance.post(ENDPOINTS.AUTH.GENERATE_RESET_TOKEN, { email }),
      refreshToken: (refreshToken) =>
        axiosInstance.post(ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken }),
    },

    // Student service
    student: {
      getAll: () => axiosInstance.get(ENDPOINTS.STUDENT.GET_ALL),
      getOne: (id) => axiosInstance.get(ENDPOINTS.STUDENT.GET_ONE(id)),
      create: (id, data) =>
        axiosInstance.post(ENDPOINTS.STUDENT.CREATE(id), data),
      update: (id, data) =>
        axiosInstance.put(ENDPOINTS.STUDENT.UPDATE(id), data),
    },

    // Attendance service
    attendance: {
      sign: (studentId, data) =>
        axiosInstance.post(ENDPOINTS.ATTENDANCE.SIGN(studentId), data),
      signWithoutLocation: (studentId, data) =>
        axiosInstance.post(
          ENDPOINTS.ATTENDANCE.SIGN_WITHOUT_LOCATION(studentId),
          data
        ),
    },

    // Enrollment service
    enrollment: {
      getAll: (studentId) =>
        axiosInstance.get(ENDPOINTS.ENROLLMENT.GET_ALL(studentId)),
      getOne: (studentId, courseId) =>
        axiosInstance.get(ENDPOINTS.ENROLLMENT.GET_ONE(studentId, courseId)),
      create: (studentId, data) =>
        axiosInstance.post(ENDPOINTS.ENROLLMENT.CREATE(studentId), data),
      delete: (studentId, courseId) =>
        axiosInstance.delete(ENDPOINTS.ENROLLMENT.DELETE(studentId, courseId)),
    },
  };
};

// Export client-side services
export const apiService = createService(axiosClient);

// Export function to create server-side services
export const createServerApiService = (token) => {
  const serverAxiosClient = createServerAxiosClient(token);
  return createService(serverAxiosClient);
};
