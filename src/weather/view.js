/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

document.addEventListener('DOMContentLoaded', () => {
	const elements = document.querySelectorAll('[data-city]');

	elements.forEach(async (element) => {
		const city = element.getAttribute('data-city');
		if (city) {
			const API_KEY = '92a1c130f7974347888163753240207';
			const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
			const data = await response.json();
			element.innerHTML = `
                <h3>${data.location.name}</h3>
                <p>${data.current.temp_c}°C</p>
                <p>${data.current.condition.text}</p>
            `;
		}
	});
	console.log('jajajajjaja');
});
