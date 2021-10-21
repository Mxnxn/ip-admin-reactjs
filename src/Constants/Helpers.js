export const getDate = (dt) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const date = new Date(dt);
    const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const mm = months[date.getMonth()];
    const year = date.getFullYear();
    const HH = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
    const MM = date.getMinutes();
    const SS = date.getMinutes();
    const ampm = date.getHours() > 12 ? "PM" : "AM";
    return `${HH}:${MM}:${SS} ${ampm} ${dd} ${mm}, ${year}`;
};

export const setDate = (dt) => {
    const date = new Date(dt);
    const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const mm = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    const year = date.getFullYear();

    return `${year}-${mm}-${dd}`;
};
