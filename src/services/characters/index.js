import { fetchData } from "../axios";

export const getAllCharacters = async (options = {}) => {
    const {
        name = "",
        series = "",
        limit = 20,
        offset = 0,
        comicId = 0,
        storyId = 0,
    } = options;
    let params = {
        limit,
        offset,
    };
    let url = `/characters`;

    if (name)
        params.nameStartsWith = name;

    if (series)
        params.series = series;

    if (comicId)
        url = `/comics/${comicId}/characters`;

    if (storyId)
        url = `/stories/${storyId}/characters`;

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
}
