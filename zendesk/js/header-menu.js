const HEADER_MENU_PRODUCTS_ID = "header-menu-products";
const HEADER_MENU_PRICING_ID = "header-menu-pricing";
const HEADER_MENU_SOLUTIONS_ID = "header-menu-solutions";
const HEADER_MENU_DEMO_ID = "header-menu-demo";
const HEADER_MENU_SERVICES_ID = "header-menu-services";
const HEADER_MENU_RESOURCES_ID = "header-menu-resources";
const HEADER_MENU_GET_STARTED = "header-menu-get-started";
const PRODUCTS_MENU_FRAME_ID = "header-menu-products-menu-items-frame";
const OPEN_MENU_CLASS = "header-menu-items-frame-open";
const HEADER_MENU_PRODUCTS_MESSAGING_ID = "header-menu-products-messaging";
const PAGE_CONTENT_CUSTOMER_SUPPORT_ID = "page-content-customer-support-frame";
const HEADER_MENU_PRODUCTS_PRIVACY_ID = "header-menu-products-privacy";
const HEADER_MENU_PRODUCTS_HELP_ID = "header-menu-products-help";
const PRICING_MENU_FRAME_ID = "header-menu-pricing-menu-items-frame";
const SOLUTIONS_MENU_FRAME_ID = "header-menu-solutions-menu-items-frame";
const DEMO_MENU_FRAME_ID = "header-menu-demo-menu-items-frame";
const SERVICES_MENU_FRAME_ID = "header-menu-services-menu-items-frame";
const RESOURCES_MENU_FRAME_ID = "header-menu-resources-menu-items-frame";
const PAGE_CONTENT_FREE_TRIALS_FRAME_ID = "page-content-free-trials-frame";
const FOOTER_POLICIES_FRAME_ID = "footer-content-policies-navigation-frame";
const PAGE_CONTENT_CUSTOMER_EXPERIENCE_FRAME_ID = "page-content-customer-experience-frame";
const HEADER_MENU_PRICING_SERVICE_ID = "header-menu-pricing-service";
const HEADER_MENU_PRICING_SALES_ID = "header-menu-pricing-sales";
const HEADER_MENU_SOLUTIONS_ENTERPISE_ID = "header-menu-solutions-enterprise";
const HEADER_MENU_SOLUTIONS_INDUSTRIES_ID = "header-menu-solutions-industries";
const PAGE_CONTENT_CUSTOMER_STORIES_FRAME_ID = "page-content-customer-stories-frame";
const PAGE_CONTENT_DIGITAL_CUSTOMER_SERVICE_ID = "page-content-digital-customer-service-frame";
const HEADER_MENU_DEMO_DEMO_ID = "header-menu-demo-demo";
const HEADER_MENU_DEMO_TRIAL_ID = "header-menu-demo-trial";
const HEADER_MENU_SERVICES_TICKETING_ID = "header-menu-services-ticketing";
const HEADER_MENU_SERVICES_FORUM_ID = "header-menu-services-forum";
const FOOTER_FRAME_ID = "footer-frame";
const HEADER_MENU_RESOURCES_BLOG_ID = "header-menu-resources-blog";
const HEADER_MENU_RESOURCES_CX_TRENDS_ID = "header-menu-cx-trends";
const PAGE_CONTENT_CUSTOMER_EXPERIENCE_LINKS_ID = "page-content-customer-experience-links-frame";
const PAGE_CONTENT_CUSTOMER_EXPERIENCE_TRENDS_ID = "page-content-customer-experience-trends-frame";

function menuCallback(menuButtonId, menuFrameId) {
	document
		.getElementById(menuButtonId)
		.addEventListener("click", () => {
			let productsMenu = document
				.getElementById(menuFrameId);
			productsMenu.classList.add(OPEN_MENU_CLASS);
			document
				.addEventListener("click", (event) => {
					if (event.target.id !== menuButtonId) {
						productsMenu.classList.remove(OPEN_MENU_CLASS);
					}
				});
		});
}

function menuItemCallback(buttonId, targetFrameId) {
	document
	.getElementById(buttonId)
	.addEventListener("click", () => {
		scrollCallback(targetFrameId);
	});
}

function scrollCallback(elementId) {
	document
		.getElementById(elementId)
		.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}

menuCallback(HEADER_MENU_PRODUCTS_ID, PRODUCTS_MENU_FRAME_ID);
menuCallback(HEADER_MENU_PRICING_ID, PRICING_MENU_FRAME_ID);
menuCallback(HEADER_MENU_SOLUTIONS_ID, SOLUTIONS_MENU_FRAME_ID);
menuCallback(HEADER_MENU_DEMO_ID, DEMO_MENU_FRAME_ID);
menuCallback(HEADER_MENU_SERVICES_ID, SERVICES_MENU_FRAME_ID);
menuCallback(HEADER_MENU_RESOURCES_ID, RESOURCES_MENU_FRAME_ID);
menuItemCallback(HEADER_MENU_GET_STARTED, PAGE_CONTENT_FREE_TRIALS_FRAME_ID);

menuItemCallback(HEADER_MENU_PRODUCTS_MESSAGING_ID, PAGE_CONTENT_CUSTOMER_SUPPORT_ID);
menuItemCallback(HEADER_MENU_PRODUCTS_PRIVACY_ID, FOOTER_POLICIES_FRAME_ID);
menuItemCallback(HEADER_MENU_PRODUCTS_HELP_ID, PAGE_CONTENT_CUSTOMER_EXPERIENCE_FRAME_ID);

menuItemCallback(HEADER_MENU_PRICING_SERVICE_ID, FOOTER_POLICIES_FRAME_ID);
menuItemCallback(HEADER_MENU_PRICING_SALES_ID, FOOTER_POLICIES_FRAME_ID);

menuItemCallback(HEADER_MENU_SOLUTIONS_ENTERPISE_ID, PAGE_CONTENT_CUSTOMER_STORIES_FRAME_ID);
menuItemCallback(HEADER_MENU_SOLUTIONS_INDUSTRIES_ID, PAGE_CONTENT_DIGITAL_CUSTOMER_SERVICE_ID);

menuItemCallback(HEADER_MENU_DEMO_DEMO_ID, PAGE_CONTENT_FREE_TRIALS_FRAME_ID);
menuItemCallback(HEADER_MENU_DEMO_TRIAL_ID, PAGE_CONTENT_FREE_TRIALS_FRAME_ID);

menuItemCallback(HEADER_MENU_SERVICES_TICKETING_ID, FOOTER_FRAME_ID);
menuItemCallback(HEADER_MENU_SERVICES_FORUM_ID, FOOTER_FRAME_ID);

menuItemCallback(HEADER_MENU_RESOURCES_BLOG_ID, PAGE_CONTENT_CUSTOMER_EXPERIENCE_LINKS_ID);
menuItemCallback(HEADER_MENU_RESOURCES_CX_TRENDS_ID, PAGE_CONTENT_CUSTOMER_EXPERIENCE_TRENDS_ID);