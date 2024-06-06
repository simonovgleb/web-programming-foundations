const HEADER_MENU_BURGER_DIV_ID = "header-menu-burger-frame";
const HEADER_MENU_BURGER_OPEN_CLASS = "header-menu-burger-open";
const BURGER_MENU_FRAME_ID = "burger-menu-frame";
const BURGER_MENU_FRAME_OPEN_CLASS = "burger-menu-open";
const HEADER_MENU_BURGER_CLOSED_CLASS = "header-menu-burger-closed";
const BURGER_MENU_FRAME_CLOSED_CLASS = "burger-menu-closed";
const BURGER_MENU_CHILDREN_CLASSES = ["header-menu-simple-button", "burger-menu-wrapper"];
const BURGER_MENU_BUTTONS_MAPPING = [
	{
		"buttonId": "burger-menu-products",
		"elementId": "page-content-customer-stories-frame"
	},
		{
		"buttonId": "burger-menu-pricing",
		"elementId": "footer-frame"
	},
	{
		"buttonId": "burger-menu-solutions",
		"elementId": "page-content-customer-experience-trends-frame"
	},
	{
		"buttonId": "burger-menu-demo",
		"elementId": "page-content-free-trials-frame"
	},
	{
		"buttonId": "burger-menu-services",
		"elementId": "page-content-customer-support-frame"
	},
	{
		"buttonId": "burger-menu-resources",
		"elementId": "page-content-customer-experience-links-frame"
	}
];
const BODY_ID = "body";
const FADED_IDS = [
	"page-content-frame",
	"footer-frame",
	"copyright-frame",
	"header-toplinks-frame",
	"header-menu-buttons-frame",
	"header-logo-group",
	"header-menu-frame"
];
const FADED_CLASS_NAME = "faded";
const NO_SCROLL_CLASS_NAME = "no-scroll";

function openSidebarMenu(event, burgerDiv) {
	event.cancelBubble = true;
	let burgerMenuFrame = document.getElementById(BURGER_MENU_FRAME_ID);
	burgerDiv.classList.remove(HEADER_MENU_BURGER_CLOSED_CLASS);
	burgerMenuFrame.classList.remove(BURGER_MENU_FRAME_CLOSED_CLASS);	
	burgerDiv.classList.add(HEADER_MENU_BURGER_OPEN_CLASS);
	burgerMenuFrame.classList.add(BURGER_MENU_FRAME_OPEN_CLASS);
	document.addEventListener("click", (docEvent) => documentCloseSidebarCallback(docEvent, burgerDiv));
	fadeOutTheRest();
	document.getElementById(BODY_ID).classList.add(NO_SCROLL_CLASS_NAME);
}

function closeSideBarMenu(event, burgerDiv) {
	event.cancelBubble = true;
	let burgerMenuFrame = document.getElementById(BURGER_MENU_FRAME_ID);
	burgerDiv.classList.add(HEADER_MENU_BURGER_CLOSED_CLASS);
	burgerMenuFrame.classList.add(BURGER_MENU_FRAME_CLOSED_CLASS);
	setTimeout(() => {
		burgerDiv.classList.remove(HEADER_MENU_BURGER_OPEN_CLASS);
		burgerMenuFrame.classList.remove(BURGER_MENU_FRAME_OPEN_CLASS);
	}, 1500);
	document.removeEventListener("click", (docEvent) => documentCloseSidebarCallback(docEvent, burgerDiv));
	removeFade();
	document.getElementById(BODY_ID).classList.remove(NO_SCROLL_CLASS_NAME);
}

function documentCloseSidebarCallback(event, burgerDiv) {
	let targetClasses = event.target.classList;
	if (!BURGER_MENU_CHILDREN_CLASSES.find(elementClass => targetClasses.contains(elementClass))) { 
		event.stopPropagation();
		closeSideBarMenu(event, burgerDiv);
	} else {
		event.stopPropagation();
		event.stopImmediatePropagation();
		event.cancelBubble = true;
	}
}

document
	.getElementById(HEADER_MENU_BURGER_DIV_ID)
	.addEventListener("click", (event) => {
		let burgerDiv = document.getElementById(HEADER_MENU_BURGER_DIV_ID);
		if (burgerDiv.classList.contains(HEADER_MENU_BURGER_OPEN_CLASS)) {
			closeSideBarMenu(event, burgerDiv);
		} else {
			openSidebarMenu(event, burgerDiv);
		}
	});

addBurgerMenuButtonsListeners();

function addBurgerMenuButtonsListeners() {
	let burgerDiv = document.getElementById(HEADER_MENU_BURGER_DIV_ID);
	BURGER_MENU_BUTTONS_MAPPING.forEach( ({ buttonId, elementId }) => burgerMenuButtonListener(burgerDiv, buttonId, elementId) );
}

function burgerMenuButtonListener(burgerDiv, buttonId, elementId) {
	document
		.getElementById(buttonId)
		.addEventListener("click", (event) => {
			closeSideBarMenu(event, burgerDiv);
			document.getElementById(elementId).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
		});
}

function fadeOutTheRest() {
	FADED_IDS.forEach( id => {
		document.getElementById(id).classList.add(FADED_CLASS_NAME);
	});
}

function removeFade() {
	FADED_IDS.forEach( id => {
		document.getElementById(id).classList.remove(FADED_CLASS_NAME);
	});
}
