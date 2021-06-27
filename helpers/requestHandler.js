const myUnsplash = require("./unsplashAPI");
const myFlickr = require("./flickrAPI");

class RequestHandler {
	async processRequest(text) {
		try {
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
			let queryString = [...opt];

			switch (opt[0]) {
				case "/splash":
					//reform the query search
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
					} else {
						container = await myUnsplash.browse(1);
					}

					link = container.response.results.map((photo) => photo.urls.full);
					break;

				case "/flickr":
					//reform the query search
					queryString.splice(0, 1);

					let optionsFlickr = {
						text: queryString.join(" "),
						page: 1,
						per_page: 3,
						format: "json",
						nojsoncallback: 1,
						media: "photo",
					};

					container = await myFlickr.search(optionsFlickr);
					link = container.body.photos.results.map((photo) => {
						let retLink = photo.urls.url[0]._content;
						if (photo.originalsecret) {
							retLink = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_o.${photo.originalformat}`;
						}
						return retLink;
					});

					break;

				case "/flickrbrowse":
					if (eval(opt[1]) > 0) {
						container = await myFlickr.browse(eval(opt[1]));
					} else {
						container = await myFlickr.browse(1);
					}

					link = container.body.photos.results.map((photo) => {
						let retLink = photo.urls.url[0]._content;
						if (photo.originalsecret) {
							retLink = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_o.${photo.originalformat}`;
						}
						return retLink;
					});

					break;

				default:
					return [];
			}

			return link;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new RequestHandler();
