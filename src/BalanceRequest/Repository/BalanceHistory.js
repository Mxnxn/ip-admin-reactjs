import { ApiCall } from "Shared/API/ApiCall";
import { HEADER } from "Shared/API/ApiHeader";

export const GetBalanceRequests = async (page) => {
    try {
        return ApiCall(`/admin/wallet/requests/${page}`, HEADER);
    } catch (error) {
        return error;
    }
};

export const GrantBalanceRequest = async (formData) => {
    try {
        return ApiCall(`/admin/add/towallet`, HEADER, formData);
    } catch (error) {
        return error;
    }
};

export const RejectBalanceRequest = async (formData) => {
    try {
        return ApiCall(`/admin/add/reject`, HEADER, formData);
    } catch (error) {
        return error;
    }
};
