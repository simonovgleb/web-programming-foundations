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
	constructor(id, category, i18nKey) {
		this.id = id;
		this.category = category;
		this.i18nKey = i18nKey;
	}

	get name() {
		return translate(locale, this.i18nKey);
	}
}

class AvailableProductCategory {
	constructor(id, i18nKey) {
		this.id = id;
		this.i18nKey = i18nKey;
	}

	get name() {
		return translate(locale, this.i18nKey);
	}
}

const CATEGORY_SOFTWARE = new AvailableProductCategory("1", "category-software");
const CATEGORY_SUPPORT = new AvailableProductCategory("2", "category-support");
const CATEGORY_CX = new AvailableProductCategory("3", "category-cx");
const CATEGORIES = [CATEGORY_SOFTWARE, CATEGORY_SUPPORT, CATEGORY_CX];
const ZENDESK_PRODUCTS = [
	new AvailableProduct("1", CATEGORY_CX.id, "header-ticketing-system-label"),
	new AvailableProduct("2", CATEGORY_SUPPORT.id, "header-messaging-live-chat-label"),
	new AvailableProduct("3", CATEGORY_SUPPORT.id, "header-help-center-label"),
	new AvailableProduct("4", CATEGORY_SUPPORT.id, "footer-voice-text"),
	new AvailableProduct("5", CATEGORY_CX.id, "footer-community-forums-text"),
	new AvailableProduct("6", CATEGORY_SOFTWARE.id, "footer-reporting-text"),
	new AvailableProduct("7", CATEGORY_SUPPORT.id, "footer-answer-bot-text"),
	new AvailableProduct("8", CATEGORY_SOFTWARE.id, "footer-customer-service-text"),
	new AvailableProduct("9", CATEGORY_SOFTWARE.id, "footer-ticketing-system-text"),
	new AvailableProduct("10", CATEGORY_SOFTWARE.id, "footer-live-chat-text"),
	new AvailableProduct("11", CATEGORY_CX.id, "footer-kb-text"),
	new AvailableProduct("12", CATEGORY_SOFTWARE.id, "footer-forum-text"),
	new AvailableProduct("13", CATEGORY_SOFTWARE.id, "footer-help-desk-text"),
	new AvailableProduct("14", CATEGORY_CX.id, "footer-security-text"),
	new AvailableProduct("15", CATEGORY_SOFTWARE.id, "footer-api-text"),
	new AvailableProduct("16", CATEGORY_CX.id, "footer-marketplace-text")
];
const DATE_FORMAT_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const TIME_FORMAT_OPTIONS = { hour: "2-digit", minute: "2-digit" };

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
		button.id = button.name + "-" + translate(DEFAULT_LOCALE, category.i18nKey).toLowerCase().replace(/\W/, "-");;
		button.value = category.name;
		button.addEventListener("input", () => filterProducts(category));

		let label = document.createElement("label");
		label.setAttribute("for", button.id);
		label.setAttribute(I18N_ATTRIBUTE, category.i18nKey);
		label.textContent = category.name;

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
	filter = category?.id;
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
		checkbox.name = "request-demo-product-option-" + translate(DEFAULT_LOCALE, product.i18nKey).toLowerCase().replace(/\W/, "-");
		checkbox.id = checkbox.name;
		checkbox.value = product.id;
		if (checked.has(product.id)) {
			checkbox.setAttribute("checked", "");
		}

		checkbox.addEventListener("input", () => selectProduct(checkbox));

		let label = document.createElement("label");
		label.setAttribute("for", checkbox.id);
		label.setAttribute(I18N_ATTRIBUTE, product.i18nKey);
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
		return (!filter || category === filter) && (search === "" || name.includes(search.toLowerCase()));
	});
}

function selectProduct(checkbox) {
	productsListError.textContent = "";
	productsListHiddenInput.setCustomValidity("");
	let productId = checkbox.value;
	if (checkbox.checked) {
		checked.add(productId);
	} else {
		checked.delete(productId);
		markProductSelectionEmpty();
	}
}

function markProductSelectionEmpty() {
	if (checked.size === 0) {
		productsListHiddenInput.setCustomValidity(translate(locale, "request-demo-select-product-error"));
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
		requestDemoNameError.textContent = translate(locale, "request-demo-name-empty-error");
	} else if (requestDemoNameInput.validity.tooShort) {
		requestDemoNameError.textContent = `${translate(locale, "request-demo-name-too-short-error")} ${requestDemoNameInput.minLength} ${translate(locale, "error-characters")}`;
	} else if (requestDemoNameInput.validity.patternMismatch) {
		requestDemoNameError.textContent = translate(locale, "request-demo-name-invalid-error");
	}
}

function requestDemoEmailErrorFun() {
	if (requestDemoEmailInput.validity.valueMissing) {
		requestDemoEmailError.textContent = translate(locale, "request-demo-email-empty-error");
	} else if (requestDemoEmailInput.validity.patternMismatch) {
		requestDemoEmailError.textContent = translate(locale, "request-demo-email-innvalid");
	}
}

function requestDemoDateErrorFun() {
	if (requestDemoDateInput.validity.valueMissing) {
		requestDemoDateError.textContent = translate(locale, "request-demo-date-empty-error");
	} else if (requestDemoDateInput.validity.rangeOverflow || requestDemoDateInput.validity.rangeUnderflow) {
		requestDemoDateError.textContent = translate(locale, "request-demo-date-out-of-range-error");
	}
}

function requestDemoTimeErrorFun() {
	if (requestDemoTimeInput.validity.valueMissing) {
		requestDemoTimeError.textContent = translate(locale, "request-demo-time-empty-error");
	} else if (requestDemoTimeInput.validity.rangeOverflow || requestDemoTimeInput.validity.rangeUnderflow) {
		requestDemoTimeError.textContent = `${translate(locale, "request-demo-time-out-of-range-error")} ${requestDemoTimeInput.min} ${translate(locale, "request-demo-time-error-preposition")} ${requestDemoTimeInput.max}`;
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
	requestDemoSummaryDate.textContent = demoDateTime.toLocaleDateString(locale, DATE_FORMAT_OPTIONS);
	requestDemoSummaryTime.textContent = demoDateTime.toLocaleTimeString(locale, TIME_FORMAT_OPTIONS);

	demoSummaryContainer.classList.add(SIGN_UP_FORM_VISIBLE_CLASS);
}

function buildProductsSummary() {
	let listElement = document.createElement("ul");

	checked.forEach(productId => {
		let listItem = document.createElement("li");
		listItem.textContent = getProductName(productId);

		listElement.appendChild(listItem);
	})

	productsListSummary.appendChild(listElement);
}

function getProductName(productId) {
	return ZENDESK_PRODUCTS.find(product => product.id === productId).name;
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