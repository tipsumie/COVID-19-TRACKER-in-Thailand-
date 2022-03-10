export const sortData = (data) => {
    let sortData = [...data];
    sortData.sort((a,b) => {
        if (a.total_case > b.total_case) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortData;
};