const IMAGES_COUNT = 15;
const IMAGES_PER_ROW = 3;
const DEFAULT_ORIENTATION = "landscape";
const BS_ROW_CLASSES = "row mh-30";
const BS_COLUMN_CLASSES = "col-4 mx-auto p-4 mw-30 mh-30";
const BS_IMG_CLASSES = "img-fluid";
const CONTAINER_HEIGHT_CLASS = "vh-100";
const BS_TEXT_CLASSES = "text-center fw-normal text-break";
const TYPING_INTERVAL_MS = 2500;

let imageContainer = document.getElementById("photo-gallery-image-container");
let imageSearchInput = document.getElementById("image-search-input");
let backToTopButton = document.getElementById("back-to-top-button");
let typingTimer;

addEventListener("load", () => {
	fillRandomImages();
});

backToTopButton.addEventListener("click", () => {
	imageSearchInput.focus();
});

function fillRandomImages() {
	requestImages(`${API_BASE_URL}${RANDOM_API_URI}/?${randomImageSearchParams()}`, placeImages);
}

function requestImages(url, callback) {
	fetch(url, {
		headers: requestHeaders(),
	})
	.then(response => response.json())
	.then(json => {
		callback(json);
	})
	.catch(error => {
		console.error("Unable to request images", error);
	});
}

function randomImageSearchParams() {
	return new URLSearchParams({
		count: IMAGES_COUNT,
		orientation: DEFAULT_ORIENTATION,
	}).toString();
}

function placeImages(data) {
	let index = 0;
	while (index < data.length) {
		let images = data.slice(index, index + IMAGES_PER_ROW);
		let row = document.createElement("div");
		row.setAttribute("class", BS_ROW_CLASSES);
		images.forEach(image => {
			let column = document.createElement("div");
			column.setAttribute("class", BS_COLUMN_CLASSES);
			let img = document.createElement("img");
			img.src = image.urls.regular;
			img.setAttribute("class", BS_IMG_CLASSES);
			let description = document.createElement("p");
			description.textContent = image.description || image.alt_description;
			description.setAttribute("class", BS_TEXT_CLASSES);

			column.appendChild(img);
			column.appendChild(description);
			row.appendChild(column);
		});

		index += IMAGES_PER_ROW;
		imageContainer.appendChild(row);
	}
	imageContainer.classList.remove(CONTAINER_HEIGHT_CLASS);
}

function replaceImages(data) {
	Array.from(imageContainer.childNodes)
		.forEach(child => child.remove());
	imageContainer.classList.add(CONTAINER_HEIGHT_CLASS);

	if (data.total > 0) {
		placeImages(data.results);
	} else {
		let noResults = document.createElement("p");
		noResults.setAttribute("class", BS_TEXT_CLASSES);
		noResults.textContent = "No results available, please update your search query.";

		imageContainer.appendChild(noResults);
	}
}

function searchImages() {
	clearTimeout(typingTimer);
	let query = imageSearchInput.value?.trim();
	if (query) {
		requestImages(`${API_BASE_URL}${SEARCH_API_URI}/?${searchImageRequestParams(query)}`, replaceImages);
	}
}

function searchImageRequestParams(query) {
	return new URLSearchParams({
		per_page: IMAGES_COUNT,
		query,
		orientation: DEFAULT_ORIENTATION,
	}).toString();
}

function requestHeaders() {
	return {
		[ACCEPT_VERSION_HEADER]: API_VERSION,
		[AUTH_HEADER]: AUTH_TEMPLATE + ACCESS_KEY,
	};
}

imageSearchInput.addEventListener('keyup', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(searchImages, TYPING_INTERVAL_MS);
});

imageSearchInput.addEventListener('keydown', () => {
  clearTimeout(typingTimer);
});