import { PanelBody, ToggleControl } from '@wordpress/components';
import { cleanForSlug } from '@wordpress/url';

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
import { InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';

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
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes, context, clientId, setAttributes } = props;

	setAttributes( { parentID:context['accordion/parentID'] } );

		return ( [
			<InspectorControls>
				<PanelBody title='Accordion Fold Settings' initialOpen={ true }>
					<ToggleControl
						label='Show'
						help={ attributes.show ? 'Fold defaults to open.' : 'Fold defaults to closed.' }
						checked={ attributes.show }
						onChange={ () => {
							setAttributes( { show: !attributes.show } );
							//console.log(attributes.buttonOutline);
								
							if( !attributes.show === true ){
								setAttributes( { showS:' show', collapseS:'' } );
							}else{
								setAttributes( { showS:'', collapseS:' collapsed' } );
							}
			
							//console.log(attributes.buttonColor);
						} }
					/>
				</PanelBody>
			</InspectorControls>,
			<div className="card">
    			<div className="card-header" id={ "heading" + attributes.foldSlug }>
      				<h2 class="mb-0">
						<RichText
							tagName='div'
							className={ "btn btn-link btn-block text-left" + attributes.collapseS }
							type='button'
							data-toggle='collapse'
							data-target={ "#collapse" + attributes.foldSlug }
							aria-expanded={ attributes.show }
							aria-controls={ "collapse" + attributes.foldSlug }
							value={ attributes.foldName }
							placeholder={ attributes.foldNamePH }
							onChange={ ( value ) => setAttributes( { foldName: value, foldSlug: cleanForSlug(value) } ) }
							allowedFormats ={ [] }
							withoutInteractiveFormatting
						/>
      				</h2>
    			</div>
    			<div id={ "collapse" + attributes.foldSlug } className={ "collapse" + attributes.showS } aria-labelledby={ "heading" + attributes.foldSlug } data-parent={ "#" + attributes.parentID }>
      				<div className="card-body">
        				<InnerBlocks allowedBlocks={ [ 'utksds/button', 'core/paragraph', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' ] } templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
      				</div>
    			</div>
  			</div>
		] );
}
