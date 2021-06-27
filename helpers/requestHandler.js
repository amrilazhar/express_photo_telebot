const myUnsplash = require("./unsplashAPI");
const myFlickr = require("./flickrAPI");

class RequestHandler {
	async processRequest(text) {
		if (text === undefined || text === null)
			throw new Error("please input text");

		let opt = text.split(" ");

		// check if the inserted query is an empty string or spaces
		if (opt.length < 2) {
			return [];
		} else {
			let checkArray = [...opt];
			checkArray.splice(0, 1);
			if (checkArray.join("") === "") return [];
		}

		let link = [];
		let container;

		switch (opt[0]) {
			case "/splash":
				//reform the query search
				let queryString = [...opt];
				queryString.splice(0, 1);				

				let optionsUnsplash = {
                    query: queryString.join(" "),
                    page: 1,
                    perPage: 3,
                };

                container = await myUnsplash.search(optionsUnsplash);
                link = container.response.results.map((photo) => photo.urls.full);

				break;
			case "/splashbrowse":
				if (eval(opt[1]) > 0) {
					container = await myUnsplash.browse(eval(opt[1]));
					link = container.response.results.map((photo) => photo.urls.full);
				} else {
					container = await myUnsplash.browse(1);
					link = container.response.results.map((photo) => photo.urls.full);
				}
				break;

			case "/flickr":
                //reform the query search
				let queryString = [...opt];
				queryString.splice(0, 1);	

				break;

			case "/flickrbrowse":
				break;

			default:
				break;
		}

		return link;
	}
}

module.exports = new RequestHandler();
