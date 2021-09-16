//define the site colors to be usable in all the blocks
let siteColors = [
	{ name: 'Light', slug: 'bg-light', color: '#F6F6F6', text: 'text-primary'},
	{ name: 'Primary', slug: 'bg-primary', color: '#58595b', text: 'text-light'},
	{ name: 'Secondary', slug: 'bg-secondary', color: '#006c93', text: 'text-light'},
];

if(typeof secondaryColor !== 'undefined'){
	var bgSecondaryColor = Object.entries(secondaryColor);
	siteColors.push(Object.fromEntries(bgSecondaryColor));
}

let textColors = [
	{ name: 'Light', slug: 'text-light', color: '#F6F6F6'},
	{ name: 'Primary', slug: 'text-primary', color: '#58595b'},
	{ name: 'Secondary', slug: 'text-secondary', color: '#006c93'},
];

if(typeof secondaryColor !== 'undefined'){
	var textSecondaryColor = Object.entries(secondaryColor);
	textColors.push(Object.fromEntries(textSecondaryColor));
	textColors.forEach( function(textColor){
		if(textColor.color === secondaryColor.color){
			textColor.slug = textColor.slug.replace("bg-", "text-");
		}
		delete textColor.text;
	} );
}

export { siteColors, textColors };