import { SelectControl, Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
	const API_KEY = '92a1c130f7974347888163753240207';
	const blockProps = useBlockProps();
	const [city, setCity] = useState('');
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchWeather = async (selectedCity) => {
		setLoading(true);
		const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCity}`);
		const data = await response.json();
		setWeather(data);
		setLoading(false);
	};

	const handleChange = (value) => {
		setCity(value);
		if (value) {
			fetchWeather(value);
		} else {
			setWeather(null);
		}
	};

	return (
		<div {...blockProps}>
			<SelectControl
				label="Select a City"
				value={city}
				options={[
					{ label: 'Select a city', value: '' },
					{ label: 'Barranquilla', value: 'Barranquilla' },
					{ label: 'Bogota', value: 'Bogota' },
					{ label: 'Cali', value: 'Cali' },
				]}
				onChange={handleChange}
			/>
			{loading && <Spinner />}
			{weather && (
				<div>
					<h3>{weather.location.name}</h3>
					<p>{weather.current.temp_c}°C</p>
					<p>{weather.current.condition.text}</p>
				</div>
			)}
		</div>
	);
}
