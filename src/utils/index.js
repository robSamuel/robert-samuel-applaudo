export const DEFAULT_IMAGE = 'https://wallpaperaccess.com/full/200282.jpg';

export const getThumbnailUrl = (thumbnail) => {
    if(!thumbnail) {
        return DEFAULT_IMAGE;
    }

    return `${thumbnail.path}.${thumbnail.extension}`;
}

export const isNotEmptyArray = arr =>
    Array.isArray(arr) && !!arr.length;

    export const mapListData = data => {
        const mappedList = data.results.map(item => {
            return {
                id: item.id,
                name: item.title || item.name || "",
                thumbnail: item.thumbnail
            }
        });
    
        return mappedList;
    };

export const mapPaginatedData = item => {
    if(!item)
        return {};

    return {
        count: item.count || 0,
        limit: item.limit || 0,
        offset: item.offset || 0,
        results: item.results || [],
        total: item.total || 0
    }
};
