class DemoContact {
	constructor(email, name) {
		this.email = email;
		this.name = name;
	}

	static from(raw) {
		return new DemoContact(raw.email, raw.name);
	}
}

class DemoTimestamp {
	constructor(date, time) {
		this.date = date;
		this.time = time;
	}

	static from(raw) {
		return new DemoTimestamp(raw.date, raw.time);
	}
}

class DemoRequest {
	constructor(products, contact, timestamp) {
		this.products = products;
		this.contact = DemoContact.from(contact);
		this.timestamp = getRequestedDemoDateTime(timestamp);
	}

	static from(raw) {
		return new DemoRequest(raw.products, raw.contact, raw.timestamp);
	}
}

class AvailableProduct {
	constructor(category, name) {
		this.category = category;
		this.name = name;
	}
}

const CATEGORY_SOFTWARE = "Software";
const CATEGORY_SUPPORT = "Support";
const CATEGORY_CX = "Customer Experience";
const CATEGORIES = [CATEGORY_SOFTWARE, CATEGORY_SUPPORT, CATEGORY_CX];
const ZENDESK_PRODUCTS = [
	new AvailableProduct(CATEGORY_CX, "Ticketing system"),
	new AvailableProduct(CATEGORY_SUPPORT, "Messaging & live chat"),
	new AvailableProduct(CATEGORY_SUPPORT, "Help center"),
	new AvailableProduct(CATEGORY_SUPPORT, "Voice"),
	new AvailableProduct(CATEGORY_CX, "Community forums"),
	new AvailableProduct(CATEGORY_SOFTWARE, "Reporting & analytics"),
	new AvailableProduct(CATEGORY_SUPPORT, "Answer Bot"),
	new AvailableProduct(CATEGORY_SOFTWARE, "Customer service software"),
	new AvailableProduct(CATEGORY_SOFTWARE, "Ticketing system software"),
	new AvailableProduct(CATEGORY_SOFTWARE, "Live chat software"),
	new AvailableProduct(CATEGORY_CX, "Knowledge base"),
	new AvailableProduct(CATEGORY_SOFTWARE, "Forum software"),
	new AvailableProduct(CATEGORY_SOFTWARE, "Help desk software"),
	new AvailableProduct(CATEGORY_CX, "Security"),
	new AvailableProduct(CATEGORY_SOFTWARE, "Platform and APIs"),
	new AvailableProduct(CATEGORY_CX, "Marketplace")
];
const DATE_FORMAT_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const TIME_FORMAT_OPTIONS = { hour: "2-digit", minute: "2-digit" };
const DEFAULT_LOCALE = "en";

let demoRequests = [];
let filter = "";
let search = "";
let checked = new Set([]);

let customerServiceViewDemoButton = document.getElementById("page-content-customer-service-trial-demo-frame");
let freeTrialsViewDemoButton = document.getElementById("page-content-free-trials-card-content-buttons-view-demo-frame");
let footerRequestDemoButton = document.getElementById("footer-content-navigation-links-columns-resources-column-content-request-demo");
let requestDemoContainer = document.getElementById("request-demo-form-frame");
let requestDemoForm = document.getElementById("request-demo-form-inputs-frame");
let filterOptionsFrame = document.getElementById("request-demo-form-products-list-filter-frame");
let resetFilterButton = document.getElementById("request-demo-form-products-list-filter-reset-button");
let productsListOptionsFrame = document.getElementById("request-demo-form-products-list-options-frame");
let productsListError = document.getElementById("request-demo-form-products-list-options-validation");
let productSearchInput = document.getElementById("request-demo-form-products-list-search-input");
let productsListHiddenInput = document.getElementById("request-demo-form-products-list-options-hidden");
let requestDemoNameInput = document.getElementById("request-demo-form-contact-info-name-input");
let requestDemoNameError = document.getElementById("request-demo-form-contact-info-name-validation");
let requestDemoEmailInput = document.getElementById("request-demo-form-contact-info-email-input");
let requestDemoEmailError = document.getElementById("request-demo-form-contact-info-email-validation");
let requestDemoDateInput = document.getElementById("request-demo-form-timestamp-date-input");
let requestDemoDateError = document.getElementById("request-demo-form-timestamp-date-validation");
let requestDemoTimeInput = document.getElementById("request-demo-form-timestamp-time-input");
let requestDemoTimeError = document.getElementById("request-demo-form-timestamp-time-validation");
let closeRequestDemoFormButton = document.getElementById("request-demo-form-close-button");
let demoSummaryContainer = document.getElementById("request-demo-summary-frame");
let productsListSummary = document.getElementById("request-demo-summary-products-list");
let requestDemoSummaryName = document.getElementById("request-demo-summary-contact-info-name");
let requestDemoSummaryEmail = document.getElementById("request-demo-summary-contact-info-email");
let requestDemoSummaryDate = document.getElementById("request-demo-summary-timestamp-date");
let requestDemoSummaryTime = document.getElementById("request-demo-summary-timestamp-time");
let demoSummaryConfirmButton = document.getElementById("request-demo-summary-confirm-button");
let demoSummaryCancelButton = document.getElementById("request-demo-summary-cancel-button");

addEventListener("load", () => {
	loadDemoRequests();
	initFilter();
	initListOptions(ZENDESK_PRODUCTS);
});

async function loadDemoRequests() {
	fetch("./data/demo.json")
		.then(response => response.json())
		.then(json => {
			demoRequests = json.requests.map(raw => DemoRequest.from(raw));
		})
		.catch(error => {
			console.error("Unable to load demo requests", error);
		});
}

function initFilter() {
	CATEGORIES.forEach(category => {
		let button = document.createElement("input");
		button.type = "radio";
		button.name = "request-demo-filter-option"; 
		button.id = button.name + "-" + category.toLowerCase().replace(/\W/, "-");;
		button.value = category;
		button.addEventListener("input", () => filterProducts(category));

		let label = document.createElement("label");
		label.setAttribute("for", button.id);
		label.textContent = category;

		filterOptionsFrame.insertBefore(button, resetFilterButton);
		filterOptionsFrame.insertBefore(label, resetFilterButton);
	});

	resetFilterButton.addEventListener("click", () => {
		if (filter !== "") {
			resetFilter();
		}
	});
}

function resetFilter() {
	filter = "";
	Array.from(filterOptionsFrame.childNodes)
		.filter(node => node.tagName === "INPUT")
		.forEach(node => node.checked = undefined);
	filterProducts(filter);
}

function filterProducts(category) {
	filter = category;
	cleanListOptions();
	initListOptions(applyFilterAndSearch());
}

function cleanListOptions() {
	Array.from(productsListOptionsFrame.childNodes)
		.filter(child => child.id !== productsListError.id)
		.forEach(child => productsListOptionsFrame.removeChild(child));
}

function initListOptions(products) {
	products.forEach(product => {
		let checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "request-demo-product-option-" + product.name.toLowerCase().replace(/\W/, "-");
		checkbox.id = checkbox.name;
		checkbox.value = product.name;
		if (checked.has(product.name)) {
			checkbox.setAttribute("checked", "");
		}

		checkbox.addEventListener("input", () => selectProduct(checkbox));

		let label = document.createElement("label");
		label.setAttribute("for", checkbox.id);
		label.textContent = product.name;

		productsListOptionsFrame.insertBefore(checkbox, productsListError);
		productsListOptionsFrame.insertBefore(label, productsListError);
	});

	markProductSelectionEmpty();
}

function applyFilterAndSearch() {
	return ZENDESK_PRODUCTS.filter(product => {
		let name = product.name.toLowerCase();
		let category = product.category;
		return (filter === "" || category === filter) && (search === "" || name.includes(search.toLowerCase()));
	});
}

function selectProduct(checkbox) {
	productsListError.textContent = "";
	productsListHiddenInput.setCustomValidity("");
	let name = checkbox.value;
	if (checkbox.checked) {
		checked.add(name);
	} else {
		checked.delete(name);
		markProductSelectionEmpty();
	}
}

function markProductSelectionEmpty() {
	if (checked.size === 0) {
		productsListHiddenInput.setCustomValidity("Select at least one product");
		productsListError.textContent = productsListHiddenInput.validationMessage;
	}
}

customerServiceViewDemoButton.addEventListener("click", requestDemo);
freeTrialsViewDemoButton.addEventListener("click", requestDemo);
footerRequestDemoButton.addEventListener("click", requestDemo);

productSearchInput.addEventListener("input", () => {
	search = productSearchInput.value.trim();
	filterProducts(filter);
});

function requestDemo() {
	if (!authUser) {
		signInButton.click();
	} else {
		requestDemoContainer.classList.add(SIGN_UP_FORM_VISIBLE_CLASS);
		fillUserData();
		applyNoScroll();
	}
}

function fillUserData() {
	requestDemoNameInput.value = authUser.firstName;
	requestDemoEmailInput.value = authUser.email;
}

requestDemoDateInput.min = `${date.getFullYear()}-${addLeadingZero(date.getMonth() + 1)}-${addLeadingZero(date.getDate() + 1)}`;
requestDemoDateInput.max = `${date.getFullYear()}-12-31`;

addInputEventListener(requestDemoNameInput, requestDemoNameError, requestDemoNameErrorFun);
addInputEventListener(requestDemoEmailInput, requestDemoEmailError, requestDemoEmailErrorFun);
addInputEventListener(requestDemoDateInput, requestDemoDateError, requestDemoDateErrorFun);
addInputEventListener(requestDemoTimeInput, requestDemoTimeError, requestDemoTimeErrorFun);

function requestDemoNameErrorFun() {
	if (requestDemoNameInput.validity.valueMissing) {
		requestDemoNameError.textContent = "Provide contact name";
	} else if (requestDemoNameInput.validity.tooShort) {
		requestDemoNameError.textContent = `Name should be at least ${requestDemoNameInput.minLength} characters`;
	} else if (requestDemoNameInput.validity.patternMismatch) {
		requestDemoNameError.textContent = "Name should be a valid name starting with capital letter";
	}
}

function requestDemoEmailErrorFun() {
	if (requestDemoEmailInput.validity.valueMissing) {
		requestDemoEmailError.textContent = "Provide contact email";
	} else if (requestDemoEmailInput.validity.patternMismatch) {
		requestDemoEmailError.textContent = "Entered value should be a valid email address";
	}
}

function requestDemoDateErrorFun() {
	if (requestDemoDateInput.validity.valueMissing) {
		requestDemoDateError.textContent = "Select suitable date for demo";
	} else if (requestDemoDateInput.validity.rangeOverflow || requestDemoDateInput.validity.rangeUnderflow) {
		requestDemoDateError.textContent = "Select any suitable date from tomorrow till the end of the year";
	}
}

function requestDemoTimeErrorFun() {
	if (requestDemoTimeInput.validity.valueMissing) {
		requestDemoTimeError.textContent = "Select suitable time for demo";
	} else if (requestDemoTimeInput.validity.rangeOverflow || requestDemoTimeInput.validity.rangeUnderflow) {
		requestDemoTimeError.textContent = `Select any suitable time from ${requestDemoTimeInput.min} till ${requestDemoTimeInput.max}`;
	}
}

function handleRequestDemoForm() {
	if (requestDemoForm.checkValidity() && productsListHiddenInput.validity.valid) {
		showSummaryForm();
	}
}

closeRequestDemoFormButton.addEventListener("click", closeRequestDemoForm);

function closeRequestDemoForm() {
	search = "";
	checked.clear();
	resetFilter();
	requestDemoForm.reset();
	removeNoScroll();
	requestDemoContainer.classList.remove(SIGN_UP_FORM_VISIBLE_CLASS);
}

function showSummaryForm() {
	buildProductsSummary();
	requestDemoSummaryName.textContent = requestDemoNameInput.value;
	requestDemoSummaryEmail.textContent = requestDemoEmailInput.value;

	let demoDateTime = getRequestedDemoDateTime(new DemoTimestamp(requestDemoDateInput.value, requestDemoTimeInput.value));
	requestDemoSummaryDate.textContent = demoDateTime.toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT_OPTIONS);
	requestDemoSummaryTime.textContent = demoDateTime.toLocaleTimeString(DEFAULT_LOCALE, TIME_FORMAT_OPTIONS);

	demoSummaryContainer.classList.add(SIGN_UP_FORM_VISIBLE_CLASS);
}

function buildProductsSummary() {
	let listElement = document.createElement("ul");

	checked.forEach(product => {
		let listItem = document.createElement("li");
		listItem.textContent = product;

		listElement.appendChild(listItem);
	})

	productsListSummary.appendChild(listElement);
}

function getRequestedDemoDateTime(timestamp) {
	let dateTime = new Date(timestamp.date);
	let timeParts = timestamp.time.split(":");
	let hours = timeParts[0];
	let minutes = timeParts[1];

	dateTime.setHours(hours);
	dateTime.setMinutes(minutes);

	return dateTime;
}

demoSummaryConfirmButton.addEventListener("click", () => {
	demoRequests.push(new DemoRequest(
		[ ...checked ],
		new DemoContact(requestDemoEmailInput.value, requestDemoNameInput.value),
		new DemoTimestamp(requestDemoDateInput.value, requestDemoTimeInput.value)
	));

	closeRequestDemoForm();
	closeDemoSummary();
});

demoSummaryCancelButton.addEventListener("click", closeDemoSummary);

function closeDemoSummary() {
	Array.from(productsListSummary.childNodes)
		.forEach(child => productsListSummary.removeChild(child));
	
	requestDemoSummaryName.textContent = "";
	requestDemoSummaryEmail.textContent = "";
	requestDemoSummaryDate.textContent = "";
	requestDemoSummaryTime.textContent = "";

	demoSummaryContainer.classList.remove(SIGN_UP_FORM_VISIBLE_CLASS);
}