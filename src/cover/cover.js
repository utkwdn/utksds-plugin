const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, PostFeaturedImage } = wp.blockEditor;
const { PanelBody, } = wp.components;

import './editor.scss';

registerBlockType( 'utkds/cover', {
	title: 'Cover',
	icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M18.7 3H5.3C4 3 3 4 3 5.3v13.4C3 20 4 21 5.3 21h13.4c1.3 0 2.3-1 2.3-2.3V5.3C21 4 20 3 18.7 3zm.8 15.7c0 .4-.4.8-.8.8H5.3c-.4 0-.8-.4-.8-.8V5.3c0-.4.4-.8.8-.8h6.2v8.9l2.5-3.1 2.5 3.1V4.5h2.2c.4 0 .8.4.8.8v13.4z"></path></svg>),
	category: 'utdesign_system',
	description: 'An image cover for the page leveraging the featured image.',
	attributes: {
		featuredImage: {
			type: 'object',
		},
	},

	edit: ( { attributes, setAttributes } ) => {
	
		const featuredImageId = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'featured_media' );
		attributes.featuredImage = featuredImageId ? wp.data.select( 'core').getMedia( featuredImageId ) : null;
	
		//console.log(attributes.featuredImage);

		return ( [
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title='Featured Image'>
					<PostFeaturedImage />
				</PanelBody>
			</InspectorControls>,
			// eslint-disable-next-line react/jsx-key
			<div className="entry-thumbnail entry-thumbnail-webapp">
			<div className='home-jumbotron' aria-hidden='false' style={ { backgroundImage: 'url(' + attributes.featuredImage.source_url + ')' } }>
				<InnerBlocks allowedBlocks={ [ 'cover/caption', ] } />
			</div>
			</div>,
		] );
	},

	save: ( { attributes } ) => {

		return (
			<div className="entry-thumbnail entry-thumbnail-webapp">
			<div className='home-jumbotron' aria-hidden='false' style={'background-image: url(/' + attributes.featuredImage.media_details.file + ');'}>
				<InnerBlocks.Content />
			</div>
			</div>
		);
	},
} );

registerBlockType( 'cover/caption', {
	title: 'Caption',
	icon: (<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v12zM7 16.5h6V15H7v1.5zm4-4h6V11h-6v1.5zM9 11H7v1.5h2V11zm6 5.5h2V15h-2v1.5z"></path></svg>),
	parent: 'utkds/cover',
	
	edit: () => {
		return (
			<div className='home-jumbotron-caption'>
			<div className='home-jumbotron-caption-inside'>
				<InnerBlocks allowedBlocks={ [ 'core/button', 'card/paragraph', 'card/heading', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main', ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
			</div>
		);
	},
	
	save () => {
		return (
			<div className='home-jumbotron-caption'>
			<div className='home-jumbotron-caption-inside'>
				<InnerBlocks.Content />
			</div>
			</div>
		);
	},
} );
