
export const sortData = (data) => {
    let sortData = [...data];
    sortData.sort((a,b) => {
        if (a.new_case > b.new_case) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortData;
};
