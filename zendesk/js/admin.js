const ADMIN_PANEL_BUTTON_VISIBLE_CLASS = "header-toplinks-admin-panel-visible";
const ADMIN_PANEL_CONTAINER_VISIBLE_CLASS = "admin-panel-frame-visible";
const ROW_NUMBER_ABBR = "rowNumber";

let adminPanelButton = document.getElementById("header-toplinks-admin-panel-button");
let adminPanelContainer = document.getElementById("admin-panel-frame");
let adminPanelCloseButton = document.getElementById("admin-panel-close-button");
let adminPanelUserTableBody = document.getElementById("admin-panel-content-user-table-body");
let adminPanelUserTableHeadRow = document.getElementById("admin-panel-content-user-table-head-row");
let demoRequestCardsWrapper = document.getElementById("admin-panel-content-demo-request-cards-wrapper");

function showAdminLinks() {
	adminPanelButton.classList.add(ADMIN_PANEL_BUTTON_VISIBLE_CLASS);
}

function hideAdminLinks() {
	adminPanelButton.classList.remove(ADMIN_PANEL_BUTTON_VISIBLE_CLASS);
}

adminPanelButton.addEventListener("click", () => {
	openAdminPanel();
	applyNoScroll();
});

adminPanelCloseButton.addEventListener("click", () => {
	closeAdminPanel();
	removeNoScroll();
});

function openAdminPanel() {
	users.forEach(addUserTableRow);
	demoRequests.forEach(addDemoRequestCard);
	adminPanelContainer.classList.add(ADMIN_PANEL_CONTAINER_VISIBLE_CLASS);
}

function addUserTableRow(user, index) {
	let tableRow = document.createElement("tr");
	
	let rowHeader = document.createElement("th");
	rowHeader.setAttribute("scope", "row");
	rowHeader.textContent = index + 1;
	tableRow.appendChild(rowHeader);
	
	Array.from(adminPanelUserTableHeadRow.childNodes)
		.filter(node => node.abbr && node.abbr !== ROW_NUMBER_ABBR)
		.forEach(node => {
			let tableCell = document.createElement("td");
			tableCell.textContent = user[node.abbr];

			tableRow.appendChild(tableCell);
		});

	adminPanelUserTableBody.appendChild(tableRow);
}

function addDemoRequestCard(demoRequest) {
	let cardContentFrame = document.createElement("div");
	let productsList = document.createElement("div");
	let contactInfo = document.createElement("div");
	let timestamp = document.createElement("div");

	productsList.textContent = demoRequest.products.map(getProductName).join(", ");
	contactInfo.insertAdjacentHTML("afterbegin", `${demoRequest.contact.name} <a href="mailto:${demoRequest.contact.email}">${demoRequest.contact.email}</a>`);
	timestamp.textContent = demoRequest.timestamp.toLocaleString(locale(), { ...DATE_FORMAT_OPTIONS, ...TIME_FORMAT_OPTIONS });

	cardContentFrame.appendChild(productsList);
	cardContentFrame.appendChild(contactInfo);
	cardContentFrame.appendChild(timestamp);

	demoRequestCardsWrapper.appendChild(cardContentFrame);
}

function closeAdminPanel() {
	removeChildren(adminPanelUserTableBody);
	removeChildren(demoRequestCardsWrapper);
	adminPanelContainer.classList.remove(ADMIN_PANEL_CONTAINER_VISIBLE_CLASS);
}

function removeChildren(parent) {
	Array.from(parent.childNodes)
		.forEach(child => child.remove());
}