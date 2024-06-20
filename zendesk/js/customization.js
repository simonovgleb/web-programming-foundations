class PageSettings {
	constructor(locale, theme) {
		this.locale = locale;
		this.theme = theme;
	}
}

const THEME_SWITCHER_LIGHT_CLASS = "header-toplinks-theme-light";
const THEME_SWITCHER_DARK_CLASS = "header-toplinks-theme-dark";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const DARK_THEME_COMMON_CLASS = "dark-theme";
const DARK_THEME_BRIGHTNESS_CLASS = "dark-theme-brightness";
const CLASSES_TO_RECOLOR = [
	"desktop-body",
	"sign-up-form-frame",
	"sign-in-form-frame",
	"sign-up-form-content-frame",
	"sign-up-form-close-button",
	"sign-up-form-input",
	"sign-up-form-inputs-frame",
	"sign-up-form-inputs-header-text",
	"sign-up-form-inputs-submit-button",
	"sign-in-form-content-frame",
	"request-demo-form-content-frame",
	"admin-panel-frame",
	"admin-panel-content-frame",
	"admin-panel-close-button",
	"admin-panel-content-demo-request-cards-wrapper",
	"admin-panel-content-user-table",
	"header-frame",
	"header-toplinks-simple-button",
	"header-menu-simple-button",
	"header-menu-items-frame",
	"header-menu-item",
	"burger-menu-frame",
	"header-toplinks-available-languages-frame",
	"header-toplinks-user-data-frame",
	"page-content-customer-support-frame",
	"page-content-customer-support-card-content-description-text-additional-text",
	"page-content-customer-support-card-content-description-text-squarespace-quote-text",
	"page-content-customer-support-card-content-description-text-squarespace-quote-author-name-text",
	"page-content-customer-support-card-content-description-text-squarespace-frame",
	"page-content-customer-experience-trends-card-frame",
	"page-content-customer-experience-trends-card-name",
	"page-content-customer-experience-trends-card-header",
	"page-content-customer-experience-trends-card-description",
	"page-content-customer-experience-trends-action-button",
	"page-content-customer-stories-frame",
	"page-content-customer-stories-background-frame",
	"page-content-customer-stories-card-content-frame",
	"page-content-customer-experience-links-frame",
	"page-content-customer-experience-links-card-content-frame",
	"slider-frame",
	"page-content-map-frame",
	"page-content-map-header",
	"footer-frame",
	"copyright-frame",
	"footer-content-navigation-links-columns-frame",
	"footer-content-subscribe-content-text-additional-text",
	"page-content-customer-support-card-content-description-text-frame",
	"page-content-customer-support-card-content-description-images-support-person-image",
	"page-content-customer-support-card-content-description-images-support-chat-image",
];
const COLORED_FRAMES = [
	"page-content-messaging-frame",
	"page-content-background-sound-frame",
	"page-content-customer-service-frame",
	"page-content-customer-support-card-content-description-images-support-chat-image",
	"page-content-customer-experience-frame",
	"page-content-digital-customer-service-card-content-frame",
	"page-content-free-trials-frame",
];
const SUPPORT_PERSON_IMAGE_PATH = "./assets/support-person-image.svg";
const SUPPORT_PERSON_IMAGE_DARK_PATH = "./assets/support-person-image-dark.jpg";
const SUPPORT_CHAT_IMAGE_PATH = "./assets/support-chat-image.svg";
const SUPPORT_CHAT_IMAGE_DARK_PATH = "./assets/support-chat-image-dark.jpg";
const USER_ICON_PATH = "./assets/user-icon.svg";
const USER_ICON_DARK_PATH = "./assets/user-icon-dark.svg";
const DEFAULT_LOCALE = "en";
const LOCALE_RU = "ru";
const LOCALES = [DEFAULT_LOCALE, LOCALE_RU];
const I18N_ATTRIBUTE = "data-i18n";
const LOCALE_RU_CLASS = "locale-ru";
const CLASSES_TO_UPDATE_AFTER_TRANSLATE = [
	"page-content-customer-service-frame",
	"page-content-customer-service-inner-frame",
	"page-content-customer-service-text-frame",
	"page-content-customer-support-header-text",
	"page-content-customer-support-card-content-description-text-squarespace-quote-author-name-text",
	"page-content-customer-experience-frame",
	"page-content-customer-experience-trends-frame",
	"page-content-customer-experience-trends-new-customer-experience-card-name",
	"page-content-customer-experience-trends-new-product-card-name",
	"page-content-customer-experience-trends-new-product-card-header",
	"page-content-digital-customer-service-card-content-text",
	"page-content-customer-stories-card-content-companies-frame",
	"page-content-customer-experience-links-card-content-links-grid-zendesk-update-button",
	"page-content-customer-experience-links-card-content-links-grid-customer-service-metrics-frame",
	"footer-frame",
	"footer-content-navigation-links-columns-favorite-things-frame",
	"footer-content-navigation-links-columns-header-text",
	"copyright-frame"
];
const EMAIL_PLACEHOLDER_KEY = "footer-subscribe-email-placeholder";
const SQUARESPACE_QUOTE_KEY = "page-content-squarespace-quote-text";
const LANGUAGE_KEY = "header-language-label";
const AVAILABLE_LANGUAGES_VISIBLE_CLASS = "header-toplinks-available-languages-frame-visible";
const TOS_PREFIX_KEY = "sign-up-form-agree-with-label";
const TOS_POSFIX_KEY = "sign-up-form-tos-label";
const PAGE_SETTINGS_STORAGE_KEY = "pageSettings";

let themeSwitcherButton = document.getElementById("header-toplinks-theme-switcher");
let supportChatImage = document.getElementById("page-content-customer-support-card-content-description-images-support-chat-image");
let supportPersonImage = document.getElementById("page-content-customer-support-card-content-description-images-support-person-image");
let subscribeEmailBox = document.getElementById("footer-content-subscribe-content-email-box-input");
let customerSupportQuote = document.getElementById("page-content-customer-support-card-content-description-text-squarespace-quote-text");
let activeLanguageButton = document.getElementById("header-toplinks-active-language");
let availableLanguagesContainer = document.getElementById("header-toplinks-available-languages-frame");
let signUpTosLabel = document.getElementById("sign-up-form-inputs-tos-label");
let userIcon = document.getElementById("header-toplinks-user-icon");

let pageSettings;

addEventListener("load", () => {
	pageSettings = loadPageSettings();
	if (theme() !== THEME_LIGHT) {
		applyTheme(theme());
	}
	if (locale() !== DEFAULT_LOCALE) {
		translatePage();
	}
});
addEventListener('beforeunload', savePageSettings);

themeSwitcherButton.addEventListener("click", () => {
	alterTheme(theme());
});

activeLanguageButton.addEventListener("click", () => {
	buildAvailableLanguagesList();
});

function applyTheme(theme) {
	if (theme === THEME_LIGHT) {
		applyLightTheme();
	} else {
		applyDarkTheme();
	}
}

function alterTheme(theme) {
	if (theme === THEME_LIGHT) {
		applyDarkTheme();
	} else {
		applyLightTheme();
	}
}

function applyLightTheme() {
	updateThemeSwitcher(THEME_SWITCHER_LIGHT_CLASS, THEME_SWITCHER_DARK_CLASS);
	pageSettings.theme = THEME_LIGHT;
	recolorElements();
	switchImages();
}

function applyDarkTheme() {
	updateThemeSwitcher(THEME_SWITCHER_DARK_CLASS, THEME_SWITCHER_LIGHT_CLASS);
	pageSettings.theme = THEME_DARK;
	recolorElements();
	switchImages();
}

function updateThemeSwitcher(toAdd, toRemove) {
	themeSwitcherButton.classList.remove(toRemove);
	themeSwitcherButton.classList.add(toAdd);
}

function recolorElements() {
	toggleThemeStyles(CLASSES_TO_RECOLOR, DARK_THEME_COMMON_CLASS);
	toggleThemeStyles(COLORED_FRAMES, DARK_THEME_BRIGHTNESS_CLASS);
	bodyElement.classList.toggle(DARK_THEME_COMMON_CLASS);
}

function toggleThemeStyles(classes, themeClass) {
	classes.forEach(className => {
		Array.from(document.getElementsByClassName(className))
			.forEach(element => element.classList.toggle(themeClass));
	});
}

function switchImages() {
	if (theme() === THEME_LIGHT) {
		supportPersonImage.src = SUPPORT_PERSON_IMAGE_PATH;
		supportChatImage.src = SUPPORT_CHAT_IMAGE_PATH;
		userIcon.src = USER_ICON_PATH;
	} else {
		supportPersonImage.src = SUPPORT_PERSON_IMAGE_DARK_PATH;
		supportChatImage.src = SUPPORT_CHAT_IMAGE_DARK_PATH;
		userIcon.src = USER_ICON_DARK_PATH;
	}
}

function translatePage() {
	Array.from(document.querySelectorAll(`[${I18N_ATTRIBUTE}]`))
		.forEach(element => element.textContent = translate(locale(), element.getAttribute(I18N_ATTRIBUTE)));
	subscribeEmailBox.setAttribute("placeholder", translate(locale(), EMAIL_PLACEHOLDER_KEY));
	customerSupportQuote.textContent = "";
	customerSupportQuote.insertAdjacentHTML("afterbegin", `&ldquo;${translate(locale(), SQUARESPACE_QUOTE_KEY)}&rdquo;`);
	signUpTosLabel.textContent = "";
	signUpTosLabel.insertAdjacentHTML("afterbegin", `${translate(locale(), TOS_PREFIX_KEY)} <a href="#" target="_blank">${translate(locale(), TOS_POSFIX_KEY)}</a>`);
	toggleThemeStyles(CLASSES_TO_UPDATE_AFTER_TRANSLATE, LOCALE_RU_CLASS);
}

function buildAvailableLanguagesList() {
	closeAvailableLanguages();
	LOCALES.filter(loc => loc !== locale())
		.forEach(loc => {
			let lang = translate(loc, LANGUAGE_KEY);
			let langElement = document.createElement("div");
			langElement.textContent = lang;
			langElement.addEventListener("click", () => applyLanguage(loc));

			availableLanguagesContainer.appendChild(langElement);
		});
}

function applyLanguage(loc) {
	pageSettings.locale = loc;
	closeAvailableLanguages();
	translatePage();
}

function closeAvailableLanguages() {
	availableLanguagesContainer.classList.toggle(AVAILABLE_LANGUAGES_VISIBLE_CLASS);
	Array.from(availableLanguagesContainer.childNodes)
		.forEach(child => child.remove());
}

function resetPageSettings() {
	localStorage.removeItem(PAGE_SETTINGS_STORAGE_KEY);
	pageSettings = loadPageSettings();
}

function loadPageSettings() {
	let stored = localStorage.getItem(PAGE_SETTINGS_STORAGE_KEY);
	return stored && stored !== "undefined"
	? JSON.parse(stored)
	: new PageSettings(DEFAULT_LOCALE, THEME_LIGHT);
}

function locale() {
	return pageSettings.locale;
}

function theme() {
	return pageSettings.theme;
}

function savePageSettings() {
	if (authUser) {
		localStorage.setItem(PAGE_SETTINGS_STORAGE_KEY, JSON.stringify(pageSettings));
	}
}