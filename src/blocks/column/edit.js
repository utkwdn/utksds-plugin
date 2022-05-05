import { withDispatch, useDispatch, select } from '@wordpress/data';
import { PanelBody, PanelRow, RangeControl, Path, SVG } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';

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
import { useBlockProps, InnerBlocks, InspectorControls, __experimentalBlockVariationPicker, store as blockEditorStore  } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'utksds/column' ];

const withCustomClassName = createHigherOrderComponent((BlockListBlock) => {
  return props => {
	if(props.name === 'utksds/column'){
    	return <BlockListBlock { ...props } className={ 'col-12 col-md-' + props.attributes.colWidth } />
	}else{
		return <BlockListBlock { ...props } />
	}
  }
}, 'withCustomClassName')
wp.hooks.addFilter('editor.BlockListBlock', 'my-plugin/with-custom-class-name', withCustomClassName)

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const {
		attributes,
		clientId,
		setAttributes,
		context,
		className
	  } = props;

	  if(typeof context['card/blockName'] !== 'undefined' && context['card/blockName'] === 'utksds/card'){
		var these_blocks = [ 'card/body', 'card/image' ];
	}else{
		//var these_blocks = [ 'core/paragraph', 'core/heading', 'core/list', 'core/quote', 'core/table', 'core/image', 'core/gallery', 'core/file', 'core/video', 'core/freeform', 'core/code', 'core/navigation', 'core/shortcode', 'core/html', 'core/latest-posts', 'core/page-list', 'core/rss', 'core/social-link', 'core/embed', 'lead/main', 'media-object/main', 'utksds/tabs', 'horizontal-rule/main', 'alert/main', 'utksds/buttongroup', 'utksds/button', 'utksds/accordion', 'utksds/card', 'utksds/calendar' ] ;
		var these_blocks = null;
	}
	
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const { getBlockRootClientId } = select( blockEditorStore );
	const rootId = getBlockRootClientId( clientId );
	const maxWidth = 12 - (context['columns/numCols'] - 1);
	
	function resizeCols( origWidth, newWidth ){
		const { getBlocks } = select( blockEditorStore );
		let innerColBlocks = getBlocks( rootId );
		
		if(newWidth > origWidth){
			var takenWidth = newWidth - origWidth;
			var takePerCol = takenWidth / ( context['columns/numCols'] - 1 );
			var remainder = 0;
			var startHere = false
			
			do{
			innerColBlocks.forEach( (element, index) =>{
				if(index === 0 && element.clientId !== clientId){
					if( element.attributes.colWidth === 1 ){
						remainder = Math.ceil(takePerCol);
					}else if( element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder ) < 1 ){
						if( element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder ) === 0 ){
							remainder = 1;
						}else{
							remainder = ( Math.ceil(takePerCol) + remainder ) - element.attributes.colWidth;
						}
						innerColBlocks[0].attributes.colWidth = 1
					}else{
						innerColBlocks[0].attributes.colWidth = element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder );
					}
				}else if(index === 0 && element.clientId === clientId){
					startHere = true;
				}else if(startHere){
					if( element.attributes.colWidth === 1 ){
						remainder = Math.ceil(takePerCol);
					}else if( element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder ) < 1 ){
						if( element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder ) === 0 ){
							remainder = 1;
						}else{
							remainder = ( Math.ceil(takePerCol) + remainder ) - element.attributes.colWidth;
						}
						innerColBlocks[index].attributes.colWidth = 1
					}else{
						innerColBlocks[index].attributes.colWidth = element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder );
					}
					startHere = false;
				}else if(element.clientId !== clientId){
					if( element.attributes.colWidth === 1 ){
						remainder = Math.floor(takePerCol);
					}else if( element.attributes.colWidth - ( Math.floor(takePerCol) + remainder ) < 1 ){
						if( element.attributes.colWidth - ( Math.floor(takePerCol) + remainder ) === 0 ){
							remainder = 1;
						}else{
							remainder = ( Math.floor(takePerCol) + remainder ) - element.attributes.colWidth;
						}
						innerColBlocks[index].attributes.colWidth = 1
					}else{
						innerColBlocks[index].attributes.colWidth = element.attributes.colWidth - ( Math.floor(takePerCol) + remainder );
						remainder = 0;
					}
				}
			} );
			} while(remainder !== 0);
		}else{
			var addedWidth = origWidth - newWidth;
			var addPerCol = addedWidth / ( context['columns/numCols'] - 1 );
			var remainder = 0;
			var startHere = false;
			
			do{
			innerColBlocks.forEach( (element, index) =>{
				if( index === 0 && element.clientId !== clientId ){
					if( element.attributes.colWidth === maxWidth ){
						remainder = Math.ceil(addPerCol);
					}else if( element.attributes.colWidth + Math.ceil(addPerCol) + remainder > maxWidth ){
						remainder = ( element.attributes.colWidth + Math.ceil(addPerCol) + remainder ) - maxWidth;
						innerColBlocks[0].attributes.colWidth = maxWidth;
					}else{
						innerColBlocks[0].attributes.colWidth = element.attributes.colWidth + Math.ceil(addPerCol) + remainder;
						remainder = 0;
					}
				}else if( index === 0 && element.clientId === clientId ){
					startHere = true;
				}else if(startHere){
					if( element.attributes.colWidth === maxWidth ){
						remainder = Math.ceil(addPerCol);
					}else if( element.attributes.colWidth + Math.ceil(addPerCol) + remainder > maxWidth ){
						remainder = ( element.attributes.colWidth + Math.ceil(addPerCol) + remainder ) - maxWidth;
						innerColBlocks[index].attributes.colWidth = maxWidth;
					}else{
						innerColBlocks[index].attributes.colWidth = element.attributes.colWidth + Math.ceil(addPerCol) + remainder;
						remainder = 0
					}
					startHere = false;
				}else if(element.clientId !== clientId){
					if( element.attributes.colWidth === maxWidth ){
						remainder = Math.floor(addPerCol);
					}else if( element.attributes.colWidth + Math.floor(addPerCol) + remainder > maxWidth ){
						remainder = ( element.attributes.colWidth + Math.floor(addPerCol) + remainder ) - maxWidth;
						innerColBlocks[index].attributes.colWidth = maxWidth;
					}else{
						innerColBlocks[index].attributes.colWidth = element.attributes.colWidth + Math.floor(addPerCol) + remainder;
						remainder = 0;
					}
				}
			} );
			} while(remainder !== 0);
		}
		
		replaceInnerBlocks( rootId, innerColBlocks );
	};
	
	function toInt(value){
		var percent = value/100;
		var colNum = 12 * percent;
		
		return Math.round(colNum);
	};
	
	function toPercent(value){
		var percent = value/12;
		var colPercent = percent * 100;
		
		return Math.round(colPercent);
	};

		return ( [
			<InspectorControls>
				<PanelBody>
					<PanelRow>
						<RangeControl
        					label="Percent Width"
							value={ toPercent(attributes.colWidth) }
				  			min={ toPercent(1) }
							max={ toPercent(maxWidth) }
        					onChange={ ( value ) =>{ 
								resizeCols( attributes.colWidth, toInt(value) )		
								setAttributes( {colWidth:toInt(value)} ); 
							} }
    					/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={ className } >
				<InnerBlocks allowedBlocks={ these_blocks } templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
			</div>
		] );
}
