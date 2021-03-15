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
import ItenDetails from "../components/ItemDetails";
import List from "../components/List";
import Layout from "../components/Layout";
import SEO from "../components/seo";

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
            const character = data.results[0] || {};
            const retrievedImage = getThumbnailUrl(character.thumbnail);
            const retrievedDescription = character.description || "";
            const retrievedName = character.name || "Not Found";

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

    return (
        <Layout>
            <SEO title="Character Info"/>
            <div className="ItemContainer">
                <ItenDetails
                    description={description}
                    image={image}
                    item="character"
                    label={name}
                />
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
