import React, { useState, useEffect } from "react";
import {
    getStoryCharacters,
    getStoryComics,
    getStoryDetails
} from "../services/stories";
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

const Story = ({ location }) => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(DEFAULT_IMAGE);
    const [title, setTitle] = useState("");
    const locationState = location.state || {};
    const storyId = locationState.id || 0;

    useEffect(() => {
        if(storyId)
            fetchData(storyId);
    }, [storyId]);

    const fetchData = async(id) => {
        const { data } = await getStoryDetails(id);

        if(isNotEmptyArray(data.results)) {
            const story = data.results[0] || {};
            const retrievedImage = getThumbnailUrl(story.thumbnail);
            const retrievedDescription = story.description || "";
            const retrievedTitle = story.title || "Not Found";

            setDescription(retrievedDescription);
            setImage(retrievedImage);
            setTitle(retrievedTitle);
        }
    };

    const fetchCharacters = async (options) => {
        const { data } = await getStoryCharacters(storyId, options);

        if(data) {
            const fetchedData = mapPaginatedData(data);
            const results = mapListData(fetchedData);

            return { ...fetchedData, results };
        }
    };

    const fetchComics = async (options) => {
        const { data } = await getStoryComics(storyId, options);

        if(data) {
            const fetchedData = mapPaginatedData(data);
            const results = mapListData(fetchedData);

            return { ...fetchedData, results };
        }
    };

    return (
        <Layout>
            <SEO title="Story Info" />
            <div className="ItemDetails">
                <ItenDetails
                    description={description}
                    image={image}
                    item="story"
                    label={title}
                />
                <List
                    link="character"
                    listTitle="Characters featured in this story"
                    retrieveData={fetchCharacters}
                />
                <List
                    link="comic"
                    listTitle="Comics featured in this story"
                    retrieveData={fetchComics}
                />
            </div>
        </Layout>
    );
};

export default Story;
