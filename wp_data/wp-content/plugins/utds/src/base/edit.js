import { Component } from '@wordpress/element';
const { __ } = wp.i18n; // Import __() from wp.i18n
const Fragment = wp.element.Fragment;
import { RichText, BlockControls, AlignmentToolbar, InspectorControls, PanelColorSettings, withColors, ContrastChecker } from '@wordpress/block-editor';

class Edit extends Component {
	render() {
		// eslint-disable-next-line no-console
		console.log( this.props );
		const { className, attributes, setTextColor, setBackgroundColor, backgroundColor, textColor } = this.props;
		const { content, alignment } = attributes;
		// eslint-disable-next-line no-shadow
		const onChangeContent = ( content ) => {
			this.props.setAttributes( { content } );
		};
		// eslint-disable-next-line no-shadow
		const onChangeAlignment = ( alignment ) => {
			this.props.setAttributes( { alignment } );
		};
		return (
			<Fragment>
				<InspectorControls>
					<PanelColorSettings
						title={ __( 'Panel', 'mytheme-blocks' ) }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __( 'Background Color' ),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __( 'Text Color' ),
							},
						] }
					>
						<ContrastChecker
							textColor={ textColor.color }
							backgroundColor={ backgroundColor.color }
						/>
					</PanelColorSettings>
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
				<RichText
					tagName="p"
					className={ this.props.className }
					onChange={ onChangeContent }
					value={ content }
					formattingControls={ [ 'bold' ] }
					style={ { textAlign: alignment, backgroundColor: backgroundColor.color, color: textColor.color } }
				/>
			</Fragment>
		);
	}
}

export default withColors( 'backgroundColor', 'textColor' )( Edit );
