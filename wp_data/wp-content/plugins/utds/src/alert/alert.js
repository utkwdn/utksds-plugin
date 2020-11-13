const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { Button, PanelBody, RadioControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/button', 'core/paragraph', 'core/heading' ];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'alert/main', {
	title: 'Alert',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 1l-12 22h24l-12-22zm-1 8h2v7h-2v-7zm1 11.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/></svg>,
	category: 'utdesign_system',
	description: 'Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.',
	attributes: {
		backgroundColor: {
			type: 'string',
			default: '',
		},
	},

	edit: ( { attributes, setAttributes } ) => {
		const { backgroundColor } = attributes;

		function onBackgroundColorChange( newColor ) {
			setAttributes( { backgroundColor: newColor } );
		}

		return ( [
			// eslint-disable-next-line react/jsx-key
		    <InspectorControls style={ { marginBottom: '40px' } }>
					<PanelBody title={ 'Background Color Settings' }>
						<p><strong>Select a Background color:</strong></p>
						<ColorPalette value={ backgroundColor }
							onChange={ onBackgroundColorChange } />
					</PanelBody>
				</InspectorControls>,
			<div className="alert-edit alert" style={ { background: backgroundColor } }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const { backgroundColor } = attributes;

		return (
			<div className="alert" style={ { background: backgroundColor } }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

 
/*
Plugin Name: Sidebar example
*/
 ( function( wp ) {
    var registerPlugin = wp.plugins.registerPlugin;
    var PluginSidebar = wp.editPost.PluginSidebar;
    var el = wp.element.createElement;
    var Text = wp.components.TextControl;
 
    registerPlugin( 'my-plugin-sidebar', {
        render: function() {
            return el( PluginSidebar,
                {
                    name: 'my-plugin-sidebar',
                    icon: 'admin-post',
                    title: 'My plugin sidebar',
                },
                el( 'div',
                    { className: 'plugin-sidebar-content' },
                    el( Text, {
                        label: 'Meta Block Field',
                        value: 'Initial value',
                        onChange: function( content ) {
                            console.log( 'content changed to ', content );
                        },
                    } )
                )
            );
        }
    } );
} )( window.wp );
