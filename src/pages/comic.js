import React, { useState, useEffect } from "react";
import {
    getComicCharacters,
    getComicDetails,
    getComicStories
} from "../services/comics";
import { 
    DEFAULT_IMAGE,
    getThumbnailUrl,
    isNotEmptyArray,
    mapListData,
    mapPaginatedData
} from "../utils";
import ItenDetails from "../components/ItemDetails";
import Layout from "../components/Layout";
import List from "../components/List";
import SEO from "../components/seo";

const Comic = ({ location }) => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(DEFAULT_IMAGE);
    const [description, setDescription] = useState("");
    const locationState = location.state || {};
    const comicId = locationState.id || 0;

    useEffect(() => {
        if(comicId)
            fetchData(comicId);
    }, [comicId]);

    const fetchData = async(id) => {
        const { data } = await getComicDetails(id);

        if(isNotEmptyArray(data.results)) {
            const comic = data.results[0] || {};
            const retrievedImage = getThumbnailUrl(comic.thumbnail);
            const retrievedDescription = comic.description || "";
            const retrievedTitle = comic.title || "Not Found";

            setDescription(retrievedDescription);
            setImage(retrievedImage);
            setTitle(retrievedTitle);
        }
    };

    const fetchCharacters = async (options) => {
        const { data } = await getComicCharacters(comicId, options);

        if(data) {
            const fetchedData = mapPaginatedData(data);
            const results = mapListData(fetchedData);

            return { ...fetchedData, results };
        }
    };

    const fetchStories = async (options) => {
        const { data } = await getComicStories(comicId, options);

        if(data) {
            const fetchedData = mapPaginatedData(data);
            const results = mapListData(fetchedData);

            return { ...fetchedData, results };
        }
    };

    return (
        <Layout>
            <SEO title="Comic Info" />
            <div className="ItemContainer">
                <ItenDetails
                    description={description}
                    image={image}
                    item="comic"
                    label={title}
                />
                <List
                    listTitle="Characters featured in this comic"
                    retrieveData={fetchCharacters}
                    link="character"
                />
                <List
                    listTitle="Stories featuring this comic"
                    retrieveData={fetchStories}
                    link="story"
                />
            </div>
        </Layout>
    );
};

export default Comic;
