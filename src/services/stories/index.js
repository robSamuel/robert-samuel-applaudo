import { fetchData } from "../axios";

export const getAllStories = async (options = {}) => {
    const {
        series = 0,
        limit = 20,
        offset = 0
    } = options;
    const params = { limit, offset };
    const url = "/stories";

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

export const getStoryDetails = async (id = 0) => {
    const url = `/stories/${id}`;

    try {
        const fetched = await fetchData({
            method: "GET",
            url
        });

        return { data: fetched.data.data };
    } catch (error) {
        return { error };
    }
};

export const getStoryComics = async (id = 0, options = {}) => {
    const url = `/stories/${id}/comics`;
    const {
        limit = 20,
        offset = 0,
    } = options;
    const params = {
        limit,
        offset,
        orderBy: "title"
    };

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

export const getStoryCharacters = async (id = 0, options = {}) => {
    const url = `/stories/${id}/characters`;
    const {
        limit = 20,
        offset = 0,
    } = options;
    const params = {
        limit,
        offset,
        orderBy: "name"
    };

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
