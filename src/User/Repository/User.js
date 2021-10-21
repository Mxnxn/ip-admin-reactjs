import { ApiCall } from "Shared/API/ApiCall";
import { HEADER } from "Shared/API/ApiHeader";

export const GetAllUsers = async () => {
    try {
        const response = await ApiCall("/admin/users", HEADER);
        return response;
    } catch (error) {
        return error;
    }
};

export const GetUserDetail = async (id) => {
    try {
        const response = await ApiCall(`/admin/user/${id}`, HEADER);
        return response;
    } catch (error) {
        return error;
    }
};

export const RestrictUser = async (id) => {
    try {
        const response = await ApiCall(`/admin/user/restrict/${id}`, HEADER);
        return response;
    } catch (error) {
        return error;
    }
};

export const UnblockUser = async (id) => {
    try {
        const response = await ApiCall(`/admin/user/activate/${id}`, HEADER);
        return response;
    } catch (error) {
        return error;
    }
};
