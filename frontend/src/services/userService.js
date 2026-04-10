import { data } from "react-router-dom";
import api from "./api";

const base = "/users";

export const sendVerfEmail = (email, name) => api.post(`${base}/send`, {
    email: email,
    name: name

});

export const verfEmailCode = (email, code) => api.post(`${base}/verify`, {
    email: email,
    code: code
});

export const createEmailTicket = (email, name, subject, message) => api.post(`${base}/create-ticket`, {
    email: email,
    name: name,
    subject: subject,
    message: message
});