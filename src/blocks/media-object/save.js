/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes } = props;

	const mediaImage = ( src, alt, width ) => {
		console.log(width);

		if ( ! src ) {
			return null;
		}

		if ( alt ) {
			return (
				<img
					className="mr-3"
					src={ src }
					alt={ alt }
					style={ { width:width } }
				/>
			);
		}

		// No alt set, so let's hide it from screen readers
		return (
			<img
				className="mr-3"
				src={ src }
				alt=""
				style={ { width:width } }
				aria-hidden="true"
			/>
		);
	};

	return (
		<div className="d-flex align-items-center">
				<div class="flex-shrink-0">
					{ mediaImage( attributes.imageUrl, attributes.imageAlt, attributes.imageSize ) }
				</div>
				<div className="flex-grow-1 ms-3">
					<InnerBlocks.Content />
				</div>
			</div>
	);
}
