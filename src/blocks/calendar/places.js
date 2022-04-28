const pp = '100';
const all_places = [ { value: null, label: 'Select a Place', disabled: true } ];

fetch('https://calendar.utk.edu/api/2/places?pp=' + pp)
	.then( response => response.json())
	.then( data =>{
	//console.log(data);
	
	var page = data.page;

	for(var place of data.places){	
		all_places.push( { value: place.place.urlname, label: place.place.name } );
	}
	
	if( page.total > 1 ){
		var this_page = 2;
		while(this_page <= page.total){
			fetch('https://calendar.utk.edu/api/2/places?pp=' + pp + '&page=' + this_page)
				.then( response => response.json())
				.then( data =>{
				
				for(var place of data.places){	
					all_places.push( { value: place.place.urlname, label: place.place.name } );
				}
				
				//console.log( all_places );
			} );
			
			this_page += 1;
		}
	}
} );

export default all_places;