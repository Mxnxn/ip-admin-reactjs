import { ApiCall } from "Shared/API/ApiCall";
import { HEADER } from "Shared/API/ApiHeader";

export const GetCategories = async () => {
    try {
        return ApiCall("/category/getAll");
    } catch (error) {
        return error;
    }
};

export const EditCategory = async (formData) => {
    try {
        return ApiCall("/admin/category/edit", HEADER, formData);
    } catch (error) {
        return error;
    }
};
