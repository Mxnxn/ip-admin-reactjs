export const HEADER = {
    headers: {
        "SESSION-TOKEN": window.localStorage.getItem("_b"),
        "Content-Type": "application/json",
    },
};
