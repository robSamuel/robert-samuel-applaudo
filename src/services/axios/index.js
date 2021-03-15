import axios from "axios";

export const fetchData = ({method, url, params}) => {
    const paramsInit = {
        apikey: process.env.GATSBY_PUBLIC_KEY,
    }

    return axios({
        method: method || "GET",
        baseURL: `${process.env.GATSBY_API_URL}`,
        url: url || "",
        params: {
            ...paramsInit,
            ...params
        }
    })
}
