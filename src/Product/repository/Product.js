import { ApiCall } from "Shared/API/ApiCall";
import { HEADER } from "Shared/API/ApiHeader";

export const GetProducts = async () => {
    try {
        return ApiCall("/product/getAll");
    } catch (error) {
        return error;
    }
};

export const ToggleProductVisibility = async (id) => {
    try {
        return await ApiCall(`/product/changeVisibility/${id}`, HEADER);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const AddNewProduct = async (formdata) => {
    try {
        return await ApiCall(`/admin/product/add`, HEADER, formdata);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const EditAProduct = async (formdata) => {
    try {
        return await ApiCall(`/admin/product/edit`, HEADER, formdata);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const DeleteProductImage = async (formdata) => {
    try {
        return await ApiCall(`/admin/product/delete/images`, HEADER, formdata);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const AddProductImage = async (formdata) => {
    try {
        return await ApiCall(`/admin/product/add/images`, HEADER, formdata);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getProduct = async (id) => {
    try {
        return await ApiCall(`/product/get/${id}`, HEADER);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const DeleteProduct = async (id) => {
    try {
        return await ApiCall(`/admin/product/delete/${id}`, HEADER);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const AddProductVariant = async (formData) => {
    try {
        return await ApiCall(`/admin/product/add/variant`, HEADER, formData);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const EditProductVariant = async (formData) => {
    try {
        return await ApiCall(`/admin/product/edit/variant`, HEADER, formData);
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const DeleteProductVariant = async (formData) => {
    try {
        return await ApiCall(`/admin/product/delete/variant`, HEADER, formData);
    } catch (error) {
        console.log(error);
        return error;
    }
};
