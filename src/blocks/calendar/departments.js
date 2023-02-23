const pp = '100';
const all_departments = [ { value: null, label: 'Select a Department', disabled: true } ];

fetch('https://calendar.utk.edu/api/2/departments?pp=' + pp)
	.then( response => response.json())
	.then( data =>{
	//console.log(data);
	
	var page = data.page;

	for(var dept of data.departments){	
		all_departments.push( { value: dept.department.urlname, label: dept.department.name } );
	}
	
	if( page.total > 1 ){
		var this_page = 2;
		while(this_page <= page.total){
			fetch('https://calendar.utk.edu/api/2/departments?pp=' + pp + '&page=' + this_page)
				.then( response => response.json())
				.then( data =>{
				
				for(var dept of data.departments){	
					all_departments.push( { value: dept.department.urlname, label: dept.department.name } );
				}
				
				//console.log( all_places );
			} );
			
			this_page += 1;
		}
	}
} );

export default all_departments;