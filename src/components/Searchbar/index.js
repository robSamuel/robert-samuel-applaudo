import React, { useState, useEffect, useRef, Fragment, useCallback } from "react"; 
import { Link } from 'gatsby';
import debounce from "lodash.debounce";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { isNotEmptyArray } from "../../utils";
import { getAllComics } from "../../services/comics";
import { getAllCharacters } from "../../services/characters";

const Searchbar = ({ text }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [matches, setMatches] = useState([]);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("All");
    const [searchText, setSearchText] = useState("");
    const resultsContainer = useRef(null);

    const clickListener = useCallback((e) => {
        if(
            !isNotEmptyArray(matches)
            && resultsContainer.current
            && !resultsContainer.current.contains(e.target)
        ) {
            setMatches([]);
        }
    }, [resultsContainer, matches]);

    useEffect(() => {
        if(document)
            document.addEventListener('click', clickListener);

        return () => {
            if(document)
                document.removeEventListener('click', clickListener);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, searchBy]);

    const resetValues = () => {
        setMatches([]);
        setSearch("");
        setSearchText("");
        setSearchBy("all");
    };

    const toggle = () => setDropdownOpen(prevDropdownOpen => !prevDropdownOpen);

    const onSelectFilter = value =>
        setSearchBy(value.currentTarget.textContent);

    const debouncedFunction = debounce(text => {
        setSearch(text)
    }, 500);

    const onSearchChange = ({ target: { value }}) => {        
        debouncedFunction(value.trim());
        setSearchText(value.trim())
    };

    const fetchData = async () => {
        if(!search || search.length < 4) {
            setMatches([]);
            return;
        }

        let results = [];

        switch (searchBy) {
            case "All":
                results = await getAllMatches();
                break;
            
            case "Characters":
                results = await getMatchedCharacters();
                break;

            case "Comics":
                results = await getMatchedComics();
                break;

            default:
                break;
        }

        setMatches(results)
    };

    const getMatchedCharacters = async () => {
        try {
            const { data } = await getAllCharacters({ name: search, limit: 10 });
            const results = formatMatchedData(data.results, "character");

            return results;
        } catch (error) {
            return [];
        }
    };

    const getMatchedComics = async () => {
        try {
            const { data } = await getAllComics({ title: search, limit: 10 });
            const results = formatMatchedData(data.results, "comic");

            return results;
        } catch (error) {
            return [];
        }
    };

    const getAllMatches = async () => {
        try {
            const [{ data: characters }, { data: comics }] = await Promise.all([
                getAllCharacters({ name: search, limit: 10 }),
                getAllComics({ title: search, limit: 10 })
            ]);
            const results = [
                ...formatMatchedData(characters.results, "character"),
                ...formatMatchedData(comics.results, "comic")
            ];

            return results;
        } catch (error) {
            return [];
        }
    };

    const formatMatchedData = (list, itemType) => {
        return list.map(item => {
            return {
                id: item.id,
                name: item.name || "",
                title: item.title || "",
                description: item.description || "",
                thumbnail: item.thumbnail,
                type: itemType
            };
        });
    }

    const renderMatchedResults = () => {
        if((!isNotEmptyArray(matches) || !search))
            return <Fragment></Fragment>;

        const results = matches.map(item => {
            const label = item.name || item.title || "";

            return (
                <li
                    className="Searchbar-match"
                    key={`${item.id}-${item.type}`}
                >
                    <Link
                        onClick={resetValues}
                        state={{ id: item.id}}
                        to={`/${item.type}`}
                    >
                        <div className="Searchbar-match-container">
                            <label className="Searchbar-match-type">
                                {item.type}
                            </label>
                            <label className="Searchbar-match-label">
                                {label}
                            </label>
                        </div>
                    </Link>
                </li>
            );
        });

        return (
            <div className="Searchbar-main-container" ref={resultsContainer}>
                <ul className="Searchbar-matches">
                    {results}
                </ul>
            </div>
        );
    };

    return (
        <div className="Searchbar">
            <div className="Searchbar-container">
                <Dropdown
                    className="Searchbar-dropdown"
                    isOpen={dropdownOpen}
                    toggle={toggle}
                >
                    <DropdownToggle>
                        {searchBy}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            onClick={onSelectFilter}
                        >
                            All
                        </DropdownItem>
                        <DropdownItem
                            onClick={onSelectFilter}
                        >
                            Characters
                        </DropdownItem>
                        <DropdownItem
                            onClick={onSelectFilter}
                        >
                            Comics
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <input
                    className="SearchInput-input dark-input"
                    placeholder="Search"
                    onChange={onSearchChange}
                    type="text"
                    value={searchText}
                />
            </div>
            {renderMatchedResults()}
        </div>
    );
};

export default Searchbar;
