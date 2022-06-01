import { dropRight, times } from 'lodash';
import { withDispatch, useDispatch, select } from '@wordpress/data';
import { PanelBody, PanelRow, RangeControl, Path, SVG } from '@wordpress/components';
import { createBlock, createBlocksFromInnerBlocksTemplate, getBlockVariations, store as blocksStore } from '@wordpress/blocks';
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
		setAttributes
	  } = props;

	  const blockProps = useBlockProps();

	  const colVariations = getBlockVariations( 'utksds/columns' );
	  const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	  
	  const colPlaceholder = (
		  <__experimentalBlockVariationPicker
			  label = 'Columns'
			  instructions = 'Choose a column layout.'
			  variations={ colVariations }
			  onSelect={ ( nextVariation ) =>{
				  //console.log( nextVariation );
				  setAttributes( nextVariation.attributes );
				  
				  replaceInnerBlocks(
					  clientId,
					  createBlocksFromInnerBlocksTemplate(
						  nextVariation.innerBlocks
					  ),
					  true
				  );
			  } }
		  />
	  );
  
	  //console.log(colVariations);
  
	  //console.log(select( blockEditorStore ).getBlocks( clientId ));
	  //create numCols and colWidths attributes in columns
	  //on change of numCols, recalculate colWidths and push results to child blocks
	  //on change of child block width, push number up to parent, recalculate the others, and push down to children
	  //widths need to be percentage on front end
	  //as last resort write loop of colVariations to create each control in DropdownMenu, replace innerBlocks with selected colVariation
  
	  function changeCols( origNum, newNum ){
		  const { getBlocks } = select( blockEditorStore );

		  let innerColBlocks = getBlocks( clientId );

		  if(newNum > origNum){
			  var numNew = newNum - origNum;
			  var takenWidth = numNew * 3;
			  var removeWidth = takenWidth / origNum;
			  
			  innerColBlocks.forEach( (element, index) =>{
				  if(index === 0){
					  //console.log(innerColBlocks[0].attributes.colWidth);
					  innerColBlocks[0].attributes.colWidth = element.attributes.colWidth - Math.ceil(removeWidth);
					  //console.log(innerColBlocks[0].attributes.colWidth);
				  }else{
					  innerColBlocks[index].attributes.colWidth = element.attributes.colWidth - Math.floor(removeWidth);
				  }
			  } );
			  
			  innerColBlocks = [
				  ...innerColBlocks,
				  ...times( newNum - origNum, () => {
					  return createBlock( 'utksds/column', { colWidth: 3} );
				  } ),
			  ];
		  }else{
			  var numNew = origNum - newNum;
			  var totalWidth = 0;
			  innerColBlocks.forEach( (element, index) =>{
				  if(index < newNum){
					  totalWidth = totalWidth + innerColBlocks[index].attributes.colWidth;
				  }
			  } );
			  var addedWith = 12 - totalWidth;
			  var addWidth = addedWith / newNum;
			  
			  innerColBlocks.forEach( (element, index) =>{
				  if( index === 0){
					  //console.log(innerColBlocks[index].attributes.colWidth);
					  innerColBlocks[0].attributes.colWidth = element.attributes.colWidth + Math.ceil(addWidth);
					  //console.log(innerColBlocks[index].attributes.colWidth);
				  }else if( index < newNum ){
					  innerColBlocks[index].attributes.colWidth = element.attributes.colWidth + Math.floor(addWidth);
				  }
			  } );
			  
			  innerColBlocks = dropRight(
				  innerColBlocks,
				  origNum - newNum
			  );
		  }

		  replaceInnerBlocks( clientId, innerColBlocks );
	  };

		return ( [
			<InspectorControls>
				<PanelBody>
					{ attributes.numCols > 0 && (
					<PanelRow>
						<RangeControl
        					label="Number of Columns"
							value={ attributes.numCols }
				  			min={ 1 }
							max={ 4 }
        					onChange={ ( value ) =>{ 
								setAttributes( {numCols:value} ); 
								changeCols( attributes.numCols, value );
							} }
    					/>
					</PanelRow>
					) }
				</PanelBody>
			</InspectorControls>,
			<div { ...blockProps }>
				<div className="container">
				<div className={"row " + attributes.rowClass }>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } placeholder={ colPlaceholder } templateLock={ 'all' } />
				</div>
				</div>
			</div>,
		] );
}
