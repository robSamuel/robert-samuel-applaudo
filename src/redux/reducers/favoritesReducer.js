import { 
    ACTION_ADD_FAVORITE_CHARACTERS,
    ACTION_ADD_FAVORITE_COMICS,
    ACTION_ADD_FAVORITE_STORIES,
    ACTION_REMOVE_FAVORITE_CHARACTERS,
    ACTION_REMOVE_FAVORITE_COMICS,
    ACTION_REMOVE_FAVORITE_STORIES,
} from "../constants";

const initialState = {
    characters: [],
    comics: [],
    stories: []
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ACTION_ADD_FAVORITE_CHARACTERS:
            return {
                ...state,
                characters: [...state.characters, payload]
            };

        case ACTION_REMOVE_FAVORITE_CHARACTERS: {
            const removed = state.characters.filter(character => character.id !== payload.id);
            
            return {
                ...state,
                characters: [...removed]
            };
        }

        case ACTION_ADD_FAVORITE_COMICS:
            return {
                ...state,
                comics: [...state.comics, payload]
            };

        case ACTION_REMOVE_FAVORITE_COMICS: {
            const removed = state.comics.filter(comic => comic.id !== payload.id);
            
            return {
                ...state,
                comics: [...removed]
            };
        }
    
        case ACTION_ADD_FAVORITE_STORIES:
            return {
                ...state,
                stories: [...state.stories, payload]
            };
            
        case ACTION_REMOVE_FAVORITE_STORIES: {
            const removed = state.stories.filter(story => story.id !== payload.id);
            
            return {
                ...state,
                stories: [...removed]
            };
        }          

        default:
            return state;
    }
};

export default reducer;