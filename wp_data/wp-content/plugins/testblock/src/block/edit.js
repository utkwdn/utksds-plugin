import { Component } from '@wordpress/element';
const { __ } = wp.i18n; // Import __() from wp.i18n
const Fragment = wp.element.Fragment;
import { RichText, BlockControls, AlignmentToolbar, InspectorControls, PanelColorSettings, withColors, ContrastChecker } from '@wordpress/block-editor';
import classnames from 'classnames';

class Edit extends Component {
	render() {
		// eslint-disable-next-line no-console
		console.log( this.props );
		const { attributes, setTextColor, setBackgroundColor, backgroundColor, textColor } = this.props;
		const { content, alignment, shadow } = attributes;
		// eslint-disable-next-line no-shadow
		const onChangeContent = ( content ) => {
			this.props.setAttributes( { content } );
		};
		// eslint-disable-next-line no-shadow
		const onChangeAlignment = ( alignment ) => {
			this.props.setAttributes( { alignment } );
		};
		// eslint-disable-next-line no-undef
		// toggleShadow = () => {
		// 	// eslint-disable-next-line space-unary-ops
		// 	this.props.setAttributes( { shadow: !this.props.attributes.shadow } );
		// };
		const classes = classnames( this.props.className, {
			'has-shadow': shadow,
		} );
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
					{/* controls = { [
						{
							icon: 'wordpress',
							title: __( 'Shadow', 'mytheme-blocks' ),
							onClick: this.toggleShadow,
							isActive: shadow,
						},
					] } */}
					<AlignmentToolbar
						value={ alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
				<RichText
					tagName="p"
					className={ classes }
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
