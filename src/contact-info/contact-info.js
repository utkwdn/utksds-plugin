import { dispatch, withDispatch, useDispatch  } from '@wordpress/data';
import { select } from '@wordpress/data';
import { Path, SVG, __experimentalSpacer as Spacer } from '@wordpress/components';
import { store as blocksStore } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';

const { registerBlockType,  } = wp.blocks;
const { InnerBlocks, InspectorControls, RichText, __experimentalLinkControl, BlockControls, } = wp.blockEditor;
const { PanelBody, PanelRow, ToolbarButton, ToolbarGroup, Popover, } = wp.components;
const { withState } = wp.compose;
const { useState } = wp.element;

const LinkControl = __experimentalLinkControl;

const ALLOWED_BLOCKS = [ 'utksds/button', 'utksds/buttongroup', 'card/paragraph', 'card/heading', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' ];

const CONTACT_TEMPLATE = [
	[ 'utksds/phones', {} ],
	[ 'utksds/socials', {} ],
];

const PHONE_TEMPLATE = [
	[ 'utksds/phone', {} ],
]

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'utksds/contact', {
	title: 'Contact Info',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/></svg>,
	category: '',
	description: 'Add an address, phone numbers, and social media links.',
	attributes: {
		address: {
			type: 'string',
		},
		address_default: {
			type: 'string',
			default: 'Enter address here.',
		},
		url: {
			type: 'string',
			default: undefined,
		},
		linkTab: {
			type: 'boolean',
			default: false,
		},
		linkTarget: {
			type: 'string',
		},
	},
				 
	edit: ( props ) => {
		const {
    		attributes,
    		setAttributes,
			isSelected,
  		} = props;
	
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
				<InnerBlocks allowedBlocks={ [ 'utksds/phones', 'utksds/socials', ] } template={ CONTACT_TEMPLATE } templateLock={ 'all' } renderAppender={ false } />
			</div>
		] );
	},
					
	save: ( { attributes } ) => {
		return(
			<div className="contact_info">
				{ attributes.url !== undefined && (
				<div className="address col-auto">
				<svg class="meta-address" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path></svg>
				<a
					className={ 'map-link text-white' }
					href={ attributes.url }
					target={ attributes.linkTarget }
				>
					<RichText.Content
						tagName="span"
						value={ attributes.address }
					/>
				</a>
				</div>
				) }
				{ attributes.url === undefined && (
				<div className="address col-auto">
				<RichText.Content
					tagName="span"
					value={ attributes.address }
				/>
				</div>
				) }
				<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'utksds/phones', {
	title: 'Phone Numbers',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>,
	category: '',
	parent: 'utksds/contact',
	description: 'A container for phone numbers.',
	
	edit: ( props ) => {
		return( [
			<div className="phoneNumbers col-auto">
			<InnerBlocks allowedBlocks={ [ 'utksds/phone', ] } template={ PHONE_TEMPLATE } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
		] );
	},
		
	save: ( { attributes } ) => {

		return (
			<div className="phoneNumbers col-auto">
			<InnerBlocks.Content />
			</div>
		);
	},
} );
				  
registerBlockType( 'utksds/socials', {
	title: 'Social Media Links',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-puzzle" viewBox="0 0 16 16"><path d="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.459.459 0 0 0-.115.118.113.113 0 0 0-.012.025L6.5 4.5v.003l.003.01c.004.01.014.028.036.053a.86.86 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.86.86 0 0 0 .271-.194.213.213 0 0 0 .039-.063v-.009a.112.112 0 0 0-.012-.025.459.459 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.459.459 0 0 0 .115-.118.113.113 0 0 0 .012-.025L9.5 11.5v-.003a.214.214 0 0 0-.039-.064.859.859 0 0 0-.27-.193C8.91 11.1 8.49 11 8 11c-.491 0-.912.1-1.19.24a.859.859 0 0 0-.271.194.214.214 0 0 0-.039.063v.003l.001.006a.113.113 0 0 0 .012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238l-.244-2.855zM4.605 3a.5.5 0 0 0-.498.55l.001.007.29 3.4A.5.5 0 0 1 3.9 7.5h-.782c-.696 0-1.182-.497-1.469-.872a.459.459 0 0 0-.118-.115.112.112 0 0 0-.025-.012L1.5 6.5h-.003a.213.213 0 0 0-.064.039.86.86 0 0 0-.193.27C1.1 7.09 1 7.51 1 8c0 .491.1.912.24 1.19.07.14.14.225.194.271a.213.213 0 0 0 .063.039H1.5l.006-.001a.112.112 0 0 0 .025-.012.459.459 0 0 0 .118-.115c.287-.375.773-.872 1.469-.872H3.9a.5.5 0 0 1 .498.542l-.29 3.408a.5.5 0 0 0 .497.55h1.878c-.048-.166-.195-.352-.463-.557-.274-.21-.52-.528-.52-.943 0-.568.447-.947.862-1.154C6.807 10.123 7.387 10 8 10s1.193.123 1.638.346c.415.207.862.586.862 1.154 0 .415-.246.733-.52.943-.268.205-.415.39-.463.557h1.878a.5.5 0 0 0 .498-.55l-.001-.007-.29-3.4A.5.5 0 0 1 12.1 8.5h.782c.696 0 1.182.497 1.469.872.05.065.091.099.118.115.013.008.021.01.025.012a.02.02 0 0 0 .006.001h.003a.214.214 0 0 0 .064-.039.86.86 0 0 0 .193-.27c.14-.28.24-.7.24-1.191 0-.492-.1-.912-.24-1.19a.86.86 0 0 0-.194-.271.215.215 0 0 0-.063-.039H14.5l-.006.001a.113.113 0 0 0-.025.012.459.459 0 0 0-.118.115c-.287.375-.773.872-1.469.872H12.1a.5.5 0 0 1-.498-.543l.29-3.407a.5.5 0 0 0-.497-.55H9.517c.048.166.195.352.463.557.274.21.52.528.52.943 0 .568-.447.947-.862 1.154C9.193 5.877 8.613 6 8 6s-1.193-.123-1.638-.346C5.947 5.447 5.5 5.068 5.5 4.5c0-.415.246-.733.52-.943.268-.205.415-.39.463-.557H4.605z"/></svg>,
	category: '',
	parent: 'utksds/contact',
	description: 'A container for social media links.',
	
	edit: ( props ) => {
		return( [
			<div>social media goes here</div>
		] );
	},
} );

registerBlockType( 'utksds/phone', {
	title: 'Add Phone',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-plus" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/><path fill-rule="evenodd" d="M12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5z"/></svg>,
	category: '',
	parent: 'utksds/phones',
	description: 'Add a phone number.',
	attributes: {
		phoneName: {
			type: 'string',
		},
		phoneNum: {
			type: 'string',
		},
	},
	
	edit: ( props ) => {
	
		const {
    		attributes,
    		setAttributes,
  		} = props;
	
		return( [
			<small className="phoneNumber text-white">
				<RichText 
					tagName='span'
					placeholder='Enter phone name'
					value={ attributes.phoneName }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => setAttributes( { phoneName: value } ) }
					withoutInteractiveFormatting
				/>:&nbsp;
				<RichText 
					tagName='span'
					placeholder='Enter phone number'
					value={ attributes.phoneNum }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => setAttributes( { phoneNum: value } ) }
					withoutInteractiveFormatting
				/>
			</small>
		] );
	},
		
	save: ( { attributes } ) => {

		return (
			<small className="phoneNumber text-white">
				<RichText.Content
					tagName="span"
					value={ attributes.phoneName }
				/>:&nbsp;
				<RichText.Content
					tagName="span"
					value={ attributes.phoneNum }
				/>
			</small>
		);
	},
} );