// lib/endpoints.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const ENDPOINTS = {
  // Faculty Endpoints
  FACULTY: {
    GET_ALL: `${API_URL}/faculties`,
    GET_ONE: (id) => `${API_URL}/faculties/${id}`,
    CREATE: `${API_URL}/faculties`,
  },

  // Level Endpoints
  LEVEL: {
    GET_ALL: `${API_URL}/levels`,
    GET_ONE: (id) => `${API_URL}/levels/${id}`,
    CREATE: `${API_URL}/levels`,
  },

  // Class Schedule Endpoints
  CLASS_SCHEDULE: {
    GET_ALL: `${API_URL}/class-schedules`,
    GET_BY_COURSES: `${API_URL}/class-schedules/courses`,
    GET_ONE: (id) => `${API_URL}/class-schedules/${id}`,
    CREATE: `${API_URL}/class-schedules`,
    UPDATE: (id) => `${API_URL}/class-schedules/${id}`,
    DELETE: (id) => `${API_URL}/class-schedules/${id}`,
  },

  // Department Endpoints
  DEPARTMENT: {
    GET_ALL: (facultyId) => `${API_URL}/faculties/${facultyId}/departments`,
    GET_ONE: (facultyId, id) =>
      `${API_URL}/faculties/${facultyId}/departments/${id}`,
    CREATE: (facultyId) => `${API_URL}/faculties/${facultyId}/departments`,
  },

  // Course Endpoints
  COURSE: {
    GET_ALL: (departmentId) => `${API_URL}/departments/${departmentId}/courses`,
    GET_ONE: (departmentId, id) =>
      `${API_URL}/departments/${departmentId}/courses/${id}`,
    CREATE: (departmentId) => `${API_URL}/departments/${departmentId}/courses`,
  },

  // Authentication Endpoints
  AUTH: {
    LOGIN: `${API_URL}/authentication/login`,
    REGISTER: `${API_URL}/authentication`,
    RESET_PASSWORD: `${API_URL}/authentication/reset-password`,
    CHANGE_PASSWORD: `${API_URL}/authentication/change-password`,
    GENERATE_RESET_TOKEN: `${API_URL}/authentication/generate-reset-token`,
    REFRESH_TOKEN: `${API_URL}/token/refresh`,
  },

  // Student Endpoints
  STUDENT: {
    GET_ALL: `${API_URL}/students`,
    GET_ONE: (id) => `${API_URL}/students/${id}`,
    CREATE: (id) => `${API_URL}/students/${id}`,
    UPDATE: (id) => `${API_URL}/students/${id}`,
  },

  // Attendance Endpoints
  ATTENDANCE: {
    SIGN: (studentId) => `${API_URL}/attendance/${studentId}`,
    SIGN_WITHOUT_LOCATION: (studentId) =>
      `${API_URL}/attendance/${studentId}/signin`,
  },

  // Enrollment Endpoints
  ENROLLMENT: {
    GET_ALL: (studentId) => `${API_URL}/enrollments/${studentId}`,
    GET_ONE: (studentId, courseId) =>
      `${API_URL}/enrollments/${studentId}/${courseId}`,
    CREATE: (studentId) => `${API_URL}/enrollments/${studentId}`,
    DELETE: (studentId, courseId) =>
      `${API_URL}/enrollments/${studentId}/${courseId}`,
  },
};
