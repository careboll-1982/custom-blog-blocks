import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const blockProps = useBlockProps.save();
	const { city } = attributes;

	return (
		<div {...blockProps}>
			<div data-city={city}></div>
		</div>
	);
};

export default Save;
