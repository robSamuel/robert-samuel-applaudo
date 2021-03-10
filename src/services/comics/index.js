import { fetchData } from "../axios";

export const getAllComics = async (options = {}) => {
    const {
        title = "",
        series = 0,
        limit = 20,
        offset = 0
    } = options;
    let params = { limit, offset };
    const url = "/comics";

    if( title)
        params.titleStartsWith = title;

    if (series)
        params.series = series;

    try {
        const fetched = await fetchData({
            method: "GET",
            url,
            params
        });

        return { data: fetched.data.data };
    } catch (error) {
        return { error };
    }
};
