import { SelectControl, Spinner } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';


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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

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
export default function Edit({ attributes, setAttributes }) {
	const API_KEY = '92a1c130f7974347888163753240207';

		const blockProps = useBlockProps();
		const { city, weatherData } = attributes;
		const [loading, setLoading] = useState(false);

		useEffect(() => {
			if (city) {
				fetchWeather(city);
			}
		}, [city]);

		const fetchWeather = async (selectedCity) => {
			setLoading(true);
			const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCity}`);
			const data = await response.json();
			setAttributes({ weatherData: data });
			setLoading(false);
		};

		const handleChange = (value) => {
			setAttributes({ city: value });
		};

		return (
			<div {...blockProps}>
				<InspectorControls>
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
				</InspectorControls>
				{loading && <Spinner />}
				{weatherData && (
					<div>
						<h3>{weatherData.location.name}</h3>
						<p>{weatherData.current.temp_c}°C</p>
						<p>{weatherData.current.condition.text}</p>
					</div>
				)}
			</div>
		);
}
