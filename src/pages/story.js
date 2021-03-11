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

import Layout from "../components/Layout";
import List from "../components/List";
import SEO from "../components/seo";

const DEFAULT_DESCRIPTION =
    "There is no description provided for this story";

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
            const story = data.results[0];
            const retrievedImage = getThumbnailUrl(story.thumbnail);
            const retrievedDescription =
                story && story.description
                    ? story.description
                    : DEFAULT_DESCRIPTION;
            const retrievedTitle = story && story.title
                ? story.title
                : "Not Found";

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

    const renderDescription = () => {
        if(!description)
            return <p>{DEFAULT_DESCRIPTION}</p>;

        return <p>{description}</p>;
    };

    return (
        <Layout>
            <SEO title="Story Info" />
            <div className="ItemDetails">
                <div className="ItemDetails-card">
                    <img
                        src={image}
                        alt={title}
                        className="ItemDetails-image"
                    />
                    <div className="ItemDetails-info">
                        <h1>{title}</h1>
                        {renderDescription()}
                    </div>
                </div>
                <List
                    listTitle="Characters featured in this story"
                    retrieveData={fetchCharacters}
                    itemType="character"
                />
                <List
                    listTitle="Comics featured in this story"
                    retrieveData={fetchComics}
                    itemType="comic"
                />
            </div>
        </Layout>
    );
};

export default Story;