import React, { useState, useEffect } from "react";
import {
    getCharacterDetails,
    getCharacterComics,
    getCharacterStories
} from "../services/characters";
import {
    DEFAULT_IMAGE,
    getThumbnailUrl,
    isNotEmptyArray,
    mapListData,
    mapPaginatedData
} from "../utils";
import List from "../components/List";
import Layout from "../components/Layout";
import SEO from "../components/seo";

const DEFAULT_DESCRIPTION =
    "There is no description provided for this character";

const Character = ({ location }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(DEFAULT_IMAGE);
    const [description, setDescription] = useState("");
    const locationState = location.state || {};
    const characterId = locationState.id || 0;

    useEffect(() => {
        if(characterId)
            fetchData(characterId);
    }, [characterId]);

    const fetchData = async(id) => {
        const { data } = await getCharacterDetails(id);

        if(isNotEmptyArray(data.results)) {
            const character = data.results[0];
            const retrievedImage = getThumbnailUrl(character.thumbnail);
            const retrievedDescription =
                character && character.description
                    ? character.description
                    : DEFAULT_DESCRIPTION;
            const retrievedName = character && character.name
                ? character.name
                : "Not Found";

            setDescription(retrievedDescription);
            setImage(retrievedImage);
            setName(retrievedName);
        }
    };

    const fetchComics = async (options) => {
        const { data } = await getCharacterComics(characterId, options);

        if(data) {
            const fetchData = mapPaginatedData(data);
            const results = mapListData(fetchData);

            return { ...fetchData, results };
        }
    };

    const fetchStories = async (options) => {
        const { data } = await getCharacterStories(characterId, options);

        if(data) {
            const fetchData = mapPaginatedData(data);
            const results = mapListData(fetchData);

            return { ...fetchData, results };
        }
    };

    const renderDescription = () => {
        if(!description)
            return <p>{DEFAULT_DESCRIPTION}</p>;

        return <p>{description}</p>;
    };

    return (
        <Layout>
            <SEO title="Character Info"/>
            <div className="ItemDetails">
                <div className="ItemDetails-card">
                    <img
                        src={image}
                        alt={name}
                        className="ItemDetails-image"
                    />
                    <div className="ItemDetails-info">
                        <h1>{name}</h1>
                        {renderDescription()}
                    </div>
                </div>
                <List
                    listTitle="Comics featuring this character"
                    retrieveData={fetchComics}
                    link="comic"
                />
                <List
                    listTitle="Stories featuring this character"
                    retrieveData={fetchStories}
                    link="story"
                />
            </div>
        </Layout>
    );
};

export default Character;
