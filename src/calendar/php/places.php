<?php

function get_places($page = NULL){
	$pp = '100';
	
	if(!isset($page) && $page != ''){
		$page = '';
	}
	
	$url = 'https://calendar.utk.edu/api/2/places?pp='.$pp.'&page='.$page;
	
	$json = file_get_contents($url);
	$places = json_decode($json);
	
	return($places);
}

$places = get_places();
$x=0;
foreach($places->places as $this_place){
	$all_places[$x]['urlname'] = $this_place->place->urlname;
	$all_places[$x]['name'] = $this_place->place->display_name;
	$x++;
}

if($places->page->total > 1){
	$i = 2;
	while($i <= $places->page->total){
		$this_page = get_places($i);
		
		foreach($this_page->places as $this_place){
			$all_places[$x]['urlname'] = $this_place->place->urlname;
			$all_places[$x]['name'] = $this_place->place->display_name;
			$x++;
		}
		$i++;
	}
}

//print_r($departments);

print 'const places = [';
foreach($all_places as $place){
	print "{ label: '".$place['name']."', value: '".$place['urlname']."'},";
}
print ']';
?>