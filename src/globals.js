//define the site colors to be usable in all the blocks
let siteColors = [
	{ name: 'Orange',  slug: 'bg-orange',  color: '#ff8200', text: 'text-white'},
	{ name: 'Dark',    slug: 'bg-dark',    color: '#4b4b4b', text: 'text-white'},
	{ name: 'Smokey',  slug: 'bg-smokey',  color: '#58595B', text: 'text-white'},
	{ name: 'Gray2',   slug: 'bg-gray2',   color: '#E0E0E0', text: 'text-dark'},
	{ name: 'Light',   slug: 'bg-light',   color: '#F6F6F6', text: 'text-dark'},
	{ name: 'Summitt', slug: 'bg-summitt', color: '#B9E1E2', text: 'text-dark'},
	{ name: 'Link',    slug: 'bg-utlink',    color: '#1a73c5', text: 'text-white'},
];

if(typeof secondaryColor !== 'undefined'){
	var bgSecondaryColor = Object.entries(secondaryColor);
	siteColors.push(Object.fromEntries(bgSecondaryColor));
}

let textColors = [
	{ name: 'Light',   slug: 'text-light',   color: '#F6F6F6'},
	{ name: 'Orange',  slug: 'text-orange',  color: '#ff8200'},
	{ name: 'Dark',    slug: 'text-dark',    color: '#4b4b4b'},
	{ name: 'Smokey',  slug: 'text-smokey',  color: '#58595B'},
	{ name: 'Gray2',   slug: 'text-gray2',   color: '#E0E0E0'},
	{ name: 'Light',   slug: 'text-light',   color: '#F6F6F6'},
	{ name: 'Summitt', slug: 'text-summitt', color: '#B9E1E2'},
	{ name: 'Link',    slug: 'text-utlink',    color: '#1a73c5'},
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
