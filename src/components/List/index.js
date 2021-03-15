import React, { Fragment, useState, useEffect } from "react";
import { v4 as uuidv4, v4 } from 'uuid';
import PropTypes from "prop-types";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import Card from "../Card";
import { getThumbnailUrl, isNotEmptyArray } from "../../utils";
import InfiniteScroll from 'react-infinite-scroll-component';
import debounce from "lodash.debounce"

const List = props => {
    const {
        filters,
        link,
        listTitle,
        placeholderSearch,
        retrieveData,
        searchBy,
        useSearch
    } = props;
    const [filterBy, setFilterBy] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const containerId = `ScrollContainer-${link}`;

    useEffect(() => {
        fetchData();        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterBy, search]);

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

    const onSelectFilter = ({ target: { value } }) => {
        setList([]);
        setFilterBy(value);
    }

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

        if(useSearch && searchBy)
            options[searchBy] = search;

        if(props.filterBy)
            options[props.filterBy] = filterBy;

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
        if(!useSearch)
            return <Fragment></Fragment>;

        return (
            <div className="SearchInput">
                <input
                    className="SearchInput-input dark-input"
                    onChange={onChangeSearch}
                    name="searchText"
                    placeholder={placeholderSearch}
                    type="text"
                />
            </div>
        );
    };

    const renderFilters = () => {
        if(!isNotEmptyArray(filters))
            return <Fragment></Fragment>;

        const items = filters.map(item => {
            return (
                <option
                    key={v4()}
                    value={item.value}
                >
                    {item.text}
                </option>
            );
        });
        
        return (
            <select
                className="SearchInput-input dark-input search-filters"
                value={filterBy}
                onChange={onSelectFilter}
                name="select"
            >
                {items}
            </select>
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

        return <span className="List-no-items">There are no items available</span>;
    };

    const renderGeneralList = () => {

        return (
            <div>
                <div className="List-search-container">
                    {renderSearchbar()}
                    {renderFilters()}
                </div>
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
                        {renderList()}
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
    filters: [],
    listTitle: "",
    placeholderSearch: "Search",
    searchBy: "",
    useSearch: false,
};

List.propTypes = {
    filterBy: PropTypes.string,
    filters: PropTypes.array,
    link: PropTypes.oneOf(["character", "comic", "story"]).isRequired,
    listTitle: PropTypes.string,
    placeholderSearch: PropTypes.string,
    retrieveData: PropTypes.func.isRequired,
    searchBy: PropTypes.string,
    useSearch: PropTypes.bool
};

export default List;
