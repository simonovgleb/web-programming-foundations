const THEME_SWITCHER_LIGHT_CLASS = "header-toplinks-theme-light";
const THEME_SWITCHER_DARK_CLASS = "header-toplinks-theme-dark";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const DARK_THEME_COMMON_CLASS = "dark-theme";
DARK_THEME_BRIGHTNESS_CLASS = "dark-theme-brightness";
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

let themeSwitcherButton = document.getElementById("header-toplinks-theme-switcher");
let supportChatImage = document.getElementById("page-content-customer-support-card-content-description-images-support-chat-image");
let supportPersonImage = document.getElementById("page-content-customer-support-card-content-description-images-support-person-image");

let theme = THEME_LIGHT;

themeSwitcherButton.addEventListener("click", () => {
	if (theme === THEME_LIGHT) {
		applyDarkTheme();
	} else {
		applyLightTheme();
	}
});

function applyLightTheme() {
	updateThemeSwitcher(THEME_SWITCHER_LIGHT_CLASS, THEME_SWITCHER_DARK_CLASS);
	theme = THEME_LIGHT;
	recolorElements();
	switchImages();
}

function applyDarkTheme() {
	updateThemeSwitcher(THEME_SWITCHER_DARK_CLASS, THEME_SWITCHER_LIGHT_CLASS);
	theme = THEME_DARK;
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
	if (theme === THEME_LIGHT) {
		supportPersonImage.src = SUPPORT_PERSON_IMAGE_PATH;
		supportChatImage.src = SUPPORT_CHAT_IMAGE_PATH;
	} else {
		supportPersonImage.src = SUPPORT_PERSON_IMAGE_DARK_PATH;
		supportChatImage.src = SUPPORT_CHAT_IMAGE_DARK_PATH;
	}
}