import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "gatsby"
import * as FavoriteActions from "../../redux/constants";
import { isNotEmptyArray } from "../../utils";

const Card = props => {
    const { id, image, link, title, itemType, useFavorite } = props;
    const dispatch = useDispatch();

    const isFavorite = useSelector(state => {
        try {
            const found = state.favorites[itemType]
                                .filter(item => item.id === id);

            return isNotEmptyArray(found);
        } catch (error) {
            return false;
        }
    });

    const getActionTypes = () => {
        switch (link) {
            case "character":
                return {
                    add: FavoriteActions.ACTION_ADD_FAVORITE_CHARACTERS,
                    remove: FavoriteActions.ACTION_REMOVE_FAVORITE_CHARACTERS
                };

            case "comic":
                return {
                    add: FavoriteActions.ACTION_ADD_FAVORITE_COMICS,
                    remove: FavoriteActions.ACTION_REMOVE_FAVORITE_COMICS
                };

            case "story":
                return {
                    add: FavoriteActions.ACTION_ADD_FAVORITE_STORIES,
                    remove: FavoriteActions.ACTION_REMOVE_FAVORITE_STORIES
                };
        
            default:
                return null;
        }
    };

    const onClickFavorite = () => {
        const actionTypes = getActionTypes();

        if(!actionTypes)
            return;

        if(!isFavorite) {
            dispatch({
                type: actionTypes.add,
                payload: {
                    id,
                    label: title,
                    image,
                    itemType: itemType,
                    link: link
                }
            });
        } else
            dispatch({type: actionTypes.remove, payload: { id }});
    };

    const renderFavoriteBtn = () => {
        if(useFavorite) {
            const iconClass = !isFavorite
                ? "far fa-star"
                : "fas fa-star";

            return (
                <button
                    onClick={onClickFavorite}
                    className="Card-favorite"
                >
                    <i className={iconClass}></i>
                </button>
            )
        }
    };

    return (
        <div className="Card">
            {renderFavoriteBtn()}
            <Link to={`/${link}`} state={{ id: id }}>
                <img src={image} alt={``} className="Card-image"/>
                <h3 className="Card-title">{title}</h3>
            </Link>
        </div>
    );
};

Card.defaultProps = {
    useFavorite: true
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.oneOf(["character", "comic", "story"]).isRequired,
    title: PropTypes.string.isRequired,
    itemType: PropTypes.string,
    useFavorite: PropTypes.bool,
};

export default Card;
