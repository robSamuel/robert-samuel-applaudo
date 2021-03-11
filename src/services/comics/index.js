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

export const getComicDetails = async (id = 0, options = {}) => {
    const url = `/comics/${id}`;
    
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

export const getComicCharacters = async (id = 0, options = {}) => {
    const url = `/comics/${id}/characters`;
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

export const getComicStories = async (id = 0, options = {}) => {
    const url = `/comics/${id}/stories`;
    const {
        limit = 20,
        offset = 0,
      } = options;
      const params = {
          limit,
          offset,
          orderBy: "id"
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
