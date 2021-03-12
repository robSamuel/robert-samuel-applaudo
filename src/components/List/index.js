import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "../Card";
import { getThumbnailUrl, isNotEmptyArray } from "../../utils";
import InfiniteScroll from 'react-infinite-scroll-component';
import debounce from "lodash.debounce"

const List = props => {
    const { link, listTitle, retrieveData } = props;
    const [hasMore, setHasMore] = useState(true);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const getType = type => {
        switch(type) {
            case "character":
                return "characters";

            case "comic":
                return "comics";

            case "story":
                return "stories";

            default:
                return;
        }
    };

    const debounceFunction = debounce(text => {
        setList([]);
        setSearch(text)
    }, 700);

    const onChangeSearch = ({ target: { value } }) => {
        const trimmed  = value.trim();

        if(trimmed !== search) {
            debounceFunction(trimmed);
        }
    };

    const fetchData = async() => {
        const options = {
            limit: 20,
            offset: list.length
        };

        if(props.useSearch && props.searchBy)
            options[props.searchBy] = search;

        const data = await retrieveData(options);

        if(data && data.results) {
            setList((prevList) => {
                return [...prevList, ...data.results];
            });

            setHasMore(list.length <= data.total);
        }
    };  

    const renderTitle = () => {
        if(listTitle) {
            return (
                <label className="List-title">
                    {`${listTitle}:`}
                </label>
            );
        }
    }

    const renderSearchbar = () => {
        if(!props.useSearch)
            return <Fragment></Fragment>;

        return (
            <div className="SearchInput">
                <input
                    className="SearchInput-input dark-input"
                    onChange={onChangeSearch}
                    name="searchText"
                    placeholder={props.placeholderSearch}
                    type="text"
                />
            </div>
        );
    };

    const renderList = () => {
        if(isNotEmptyArray(list)) {
            const type = getType(link);

            return list.map(item => {
                const label = item.name || item.title || "";

                return (
                    <Card
                        key={`${type}-${item.id}`}
                        id={item.id}
                        image={getThumbnailUrl(item.thumbnail)}
                        itemType={type}
                        link={link}
                        title={label}
                    />
                );
            });            
        }

        return <span>There are no items available</span>;
    };

    const renderGeneralList = () => {
        const containerId = `ScrollContainer-${link}`;

        return (
            <div>
                {renderSearchbar()}
                <div id={containerId} className="List-container">
                    <InfiniteScroll
                        className="List"
                        dataLength={list.length}
                        hasMore={hasMore}
                        next={fetchData}
                        scrollableTarget={containerId}
                    >
                        {renderList()}
                    </InfiniteScroll>           
                </div>
            </div>
        );
    };    

    const renderTitledList = () => {
        const containerId = `ScrollContainer-${link}`;

        return (
            <div className="List-title-container">
                {renderTitle()}
                <div id={containerId} className="List-container">
                    <InfiniteScroll
                        className="List"
                        dataLength={list.length}
                        hasMore={hasMore}
                        next={fetchData}
                        scrollableTarget={containerId}
                    >
                        {renderList(props)}
                    </InfiniteScroll>
                </div>
            </div>
        );
    };

    const render = () => {
        const component = listTitle
            ? renderTitledList()
            : renderGeneralList();

        return component;
    };

    return render();
};

List.defaulProps = {
    listTitle: "",
    placeholderSearch: "Search",
    searchBy: "",
    useSearch: false,
};

List.propTypes = {
    link: PropTypes.oneOf(["character", "comic", "story"]).isRequired,
    listTitle: PropTypes.string,
    placeholderSearch: PropTypes.string,
    retrieveData: PropTypes.func.isRequired,
    searchBy: PropTypes.string,
    useSearch: PropTypes.bool
};

export default List;
