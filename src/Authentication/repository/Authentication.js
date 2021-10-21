import { ApiCall } from "Shared/API/ApiCall";

export const LoginAdmin = async (formData) => {
    const response = await ApiCall("/admin/login", {}, formData);
    return response;
};
export const RegisterAdmin = async (formData) => {
    const response = await ApiCall("/admin/login", {}, formData);
    return response;
};
