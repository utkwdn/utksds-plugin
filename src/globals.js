//define the site colors to be usable in all the blocks
let siteColors = [
	{ name: 'Light', slug: 'bg-light', color: '#F6F6F6', text: 'text-primary'},
	{ name: 'Primary', slug: 'bg-primary', color: '#58595b', text: 'text-light'},
	{ name: 'Secondary', slug: 'bg-secondary', color: '#006c93', text: 'text-light'},
];

if(typeof secondaryColor !== 'undefined'){
	siteColors.push(secondaryColor);
}

let textColors = [
	{ name: 'Light', slug: 'text-light', color: '#F6F6F6'},
	{ name: 'Primary', slug: 'text-primary', color: '#58595b'},
	{ name: 'Secondary', slug: 'text-secondary', color: '#006c93'},
];

export { siteColors, textColors };