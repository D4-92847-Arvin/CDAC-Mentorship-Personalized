import axios from "axios";

const PAYMENT_API = "http://localhost:5000/api/payment";

export const createOrder = (studentId, planId, amount) => {
  return axios.post(`${PAYMENT_API}/create-order`, {
    studentId,
    planId,
    amount
  });
};

export const verifyPayment = (data) => {
  return axios.post(`${PAYMENT_API}/verify`, data);
};
