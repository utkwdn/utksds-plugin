const pp = '100';
const all_groups = [ { value: null, label: 'Select a Group', disabled: true } ];

fetch('https://calendar.utk.edu/api/2/groups?pp=' + pp)
	.then( response => response.json())
	.then( data =>{
	//console.log(data);
	
	var page = data.page;

	for(var group of data.groups){	
		all_groups.push( { value: group.group.urlname, label: group.group.name } );
	}
	
	if( page.total > 1 ){
		var this_page = 2;
		while(this_page <= page.total){
			fetch('https://calendar.utk.edu/api/2/groups?pp=' + pp + '&page=' + this_page)
				.then( response => response.json())
				.then( data =>{
				
				for(var group of data.groups){	
					all_groups.push( { value: group.group.urlname, label: group.group.name } );
				}
				
				//console.log( all_places );
			} );
			
			this_page += 1;
		}
	}
} );

export default all_groups;