const PAGE_CONTENT_BACKGROUND_SOUND_BUTTON_ID = "page-content-background-sound-control-button";
const PAGE_CONTENT_BACKGROUND_SOUND_AUDIO_ID = "page-content-background-sound-audio";
const PAGE_CONTENT_CX_TRENDS_NEW_PRODUCT_ID = "page-content-customer-experience-trends-new-product-frame";
const PAGE_CONTENT_CX_TRENDS_CX_CHAMPIOINS_ID = "page-content-customer-experience-trends-customer-experience-champions-frame";
const PAGE_CONTENT_CX_TRENDS_NEW_CX_ID = "page-content-customer-experience-trends-new-customer-experience-frame";
const AUDIO_ID_PREFIX = "page-content-customer-experience-trends-audio-";
const AUDIO_AMOUNT = 3;
const IMAGE_PREFIX = "./assets/texture-";
const IMAGE_POSTFIX = ".jpg";
const IMAGE_AMOUNT = 10;

document
	.getElementById(PAGE_CONTENT_BACKGROUND_SOUND_BUTTON_ID)
	.addEventListener("click", () => {
		let audio = document.getElementById(PAGE_CONTENT_BACKGROUND_SOUND_AUDIO_ID);
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	});

function addCXEventListener(frameId) {
	document
		.getElementById(frameId)
		.addEventListener("click", (event) => {
			let audioNumber = rand(AUDIO_AMOUNT);
			let imageNumber = rand(IMAGE_AMOUNT);
			let audio = document.getElementById(AUDIO_ID_PREFIX + audioNumber);
			let frame = document.getElementById(frameId);

			audio.play();

			frame.style.backgroundImage = `url(${IMAGE_PREFIX}${imageNumber}${IMAGE_POSTFIX})`;
			frame.style.backgroundColor = "rgba(255,255,255,0.6)";
			frame.style.backgroundBlendMode = "lighten";
		});
}

function rand(pool) {
	return 1 + Math.floor(Math.random() * pool);
}

addCXEventListener(PAGE_CONTENT_CX_TRENDS_NEW_PRODUCT_ID);
addCXEventListener(PAGE_CONTENT_CX_TRENDS_CX_CHAMPIOINS_ID);
addCXEventListener(PAGE_CONTENT_CX_TRENDS_NEW_CX_ID);