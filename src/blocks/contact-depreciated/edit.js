import { ToolbarButton, ToolbarGroup, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';

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
import { useBlockProps, InnerBlocks, RichText, __experimentalLinkControl, BlockControls  } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'utkwds/button', 'core/paragraph', 'utkwds/card-heading', 'core/list', 'core/quote', 'utkwds/lead', 'utkwds/horizontal-rule', 'utksds/button', 'card/heading','lead/main', 'horizontal-rule/main' ];

const CONTACT_TEMPLATE = [
	[ 'utksds/phones', {} ],
	[ 'utksds/socials', {} ],
];

const PHONE_TEMPLATE = [
	[ 'utksds/phone', {} ],
]

const SOCIAL_TEMPLATE = [
	[ 'core/social-links', {} ],
]

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
    	setAttributes,
		isSelected,
	  } = props;

	  const blockProps = useBlockProps();

	  const urlIsSet = !! attributes.url;
	  const urlIsSetandSelected = urlIsSet && isSelected;

	  const unlinkButton = () => {
		  setAttributes( {
			  url: undefined,
			  linkTarget: undefined,
			  linkTab: false,
		  } );
		  setisVisible( false );
	  };
	  
	  const [ isVisible, setisVisible ] = useState( false );
	  const toggleVisible = () => setisVisible(value => !value);
  
	  const [ NewTab, setNewTab ] = useState( attributes.linkTab );
  
	  //console.log(attributes.url);

		return ( [
			<BlockControls>
				<ToolbarGroup>
					{ ! urlIsSet && (
					<ToolbarButton
						name="link"
						icon={ <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/><path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/></svg> }
						title='Link Map'
						onClick={ toggleVisible }
					/>
					) }
					{ urlIsSetandSelected && (
					<ToolbarButton
						name="link"
						icon={ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M15.6 7.3h-.7l1.6-3.5-.9-.4-3.9 8.5H9v1.5h2l-1.3 2.8H8.4c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7H10V7.3H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H9l-1.4 3.2.9.4 5.7-12.5h1.4c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2z"></path></svg> }
						title={ 'Unlink Map' }
						onClick={ unlinkButton }
						isActive={ true }
					/>
					) }
					{ isVisible && (
                	<Popover>
                    	<LinkControl
							value = { { url: attributes.url, opensInNewTab: attributes.linkTab } }
							onChange={ ( {
								url: newurl = '',
								opensInNewTab: NewTab
							} ) => {
								
								setAttributes( { url: newurl, opensInNewTab: setNewTab(value => !value) } );
			
								attributes.url = newurl;
								attributes.linkTab = NewTab;
			
								if ( attributes.linkTab === true ) {
									attributes.linkTarget = '_blank';
								} else {
									attributes.linkTarget = undefined;
								}
							} }
 						/>
                	</Popover>
            		) }
				</ToolbarGroup>
			</BlockControls>,
			<div { ...blockProps }>
			<div className="contact_info">
				<div className="address col-auto">
				<RichText 
					tagName='span'
					placeholder={ attributes.address_default }
					value={ attributes.address }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => setAttributes( { address: value } ) }
					withoutInteractiveFormatting
				/>
				</div>
				<small className="emailList col-auto">
				<RichText 
					tagName='span'
					placeholder={ 'E-Mail' }
					value={ attributes.email }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => setAttributes( { email: value } ) }
					withoutInteractiveFormatting
				/>
				</small>
				<InnerBlocks allowedBlocks={ [ 'utkwds/phones', 'utkwds/socials', 'utksds/phones', 'utksds/socials' ] } template={ CONTACT_TEMPLATE } templateLock={ 'all' } renderAppender={ false } />
			</div>
			</div>
		] );
}
