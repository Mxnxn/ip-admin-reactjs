import Axios from "axios";

export const ApiCall = (pathname, HEADER, PAYLOAD) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (PAYLOAD) {
                const response = await Axios.post(`${process.env.REACT_APP_API_URL}${pathname}`, PAYLOAD, HEADER);
                resolve(response.data);
            } else {
                const response = await Axios.get(`${process.env.REACT_APP_API_URL}${pathname}`, HEADER);
                resolve(response.data);
            }
        } catch (error) {
            if (error.response.status === 404) reject({ status: false, message: "Internal error", code: 500 });
            if (error.response) reject(error.response.data);
        }
    });
};
