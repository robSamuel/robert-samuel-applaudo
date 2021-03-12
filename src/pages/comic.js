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
import Layout from "../components/Layout";
import List from "../components/List";
import SEO from "../components/seo";

const DEFAULT_DESCRIPTION =
    "There is no description provided for this comic";

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
            const comic = data.results[0];
            const retrievedImage = getThumbnailUrl(comic.thumbnail);
            const retrievedDescription =
                comic && comic.description
                    ? comic.description
                    : DEFAULT_DESCRIPTION;
            const retrievedTitle = comic && comic.title
                ? comic.title
                : "Not Found";

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

    const renderDescription = () => {
        if(!description)
            return <p>{DEFAULT_DESCRIPTION}</p>;

        return <p>{description}</p>;
    };

    return (
        <Layout>
            <SEO title="Comic Info" />
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
