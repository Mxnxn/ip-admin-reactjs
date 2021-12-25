const GlobalLogout = () => {
    window.localStorage.removeItem("_b");
    window.localStorage.removeItem("_c");
    window.localStorage.removeItem("_uid");
    window.location.reload();
};

export default GlobalLogout;
