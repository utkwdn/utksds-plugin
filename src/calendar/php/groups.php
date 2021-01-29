<?php

function get_groups($page = NULL){
	$pp = '100';
	
	if(!isset($page) && $page != ''){
		$page = '';
	}
	
	$url = 'https://calendar.utk.edu/api/2/groups?pp='.$pp.'&page='.$page;
	
	$json = file_get_contents($url);
	$groups = json_decode($json);
	
	return($groups);
}

$groups = get_groups();
$x=0;
foreach($groups->groups as $this_group){
	$all_groups[$x]['urlname'] = $this_group->group->urlname;
	$all_groups[$x]['name'] = $this_group->group->name;
	$x++;
}

if($groups->page->total > 1){
	$i = 2;
	while($i <= $groups->page->total){
		$this_page = get_groups($i);
		
		foreach($this_page->groups as $this_group){
			$all_groups[$x]['urlname'] = $this_group->group->urlname;
			$all_groups[$x]['name'] = $this_group->group->name;
			$x++;
		}
		$i++;
	}
}

//print_r($departments);

print 'const groups = [';
foreach($all_groups as $group){
	print "{ label: '".$group['name']."', value: '".$group['urlname']."'},";
}
print ']';
?>