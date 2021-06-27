//import for unsplash API
const fetch = require("node-fetch");
const { createApi } = require("unsplash-js");

// Load Unsplash API
const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	headers: { "Accept-Version": "v1" },
	fetch: fetch,
});

module.exports.search = async (options) => {
    try {
        return await unsplash.search.getPhotos(options);
    } catch (error) {
        //console.log(error);
        return null;
    }
	
};

module.exports.browse = async (page = 1, limit = 5) => {
    try {
        return await unsplash.photos.list({ page: page, perPage: limit });
    } catch (error) {
        //console.log(error);
        return null;
    }
	
};

module.exports.getPhoto = async (id) => {
    try {
        return await unsplash.photos.get({ photoId: id });
    } catch (error) {
        //console.log(error);
        return null;
    }
	
};
