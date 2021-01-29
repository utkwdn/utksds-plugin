<?php
header('Content-type:application/json;charset=utf-8');

function get_departments($page = NULL){
	$pp = '100';
	
	if(!isset($page) && $page != ''){
		$page = '';
	}
	
	$url = 'https://calendar.utk.edu/api/2/departments?pp='.$pp.'&page='.$page;
	
	$json = file_get_contents($url);
	$depts = json_decode($json);
	
	return($depts);
}

$depts = get_departments();
$x=0;
foreach($depts->departments as $this_dept){
	$departments[$x]['urlname'] = $this_dept->department->urlname;
	$departments[$x]['name'] = $this_dept->department->name;
	$x++;
}

if($depts->page->total > 1){
	$i = 2;
	while($i <= $depts->page->total){
		$this_page = get_departments($i);
		
		foreach($this_page->departments as $this_dept){
			$departments[$x]['urlname'] = $this_dept->department->urlname;
			$departments[$x]['name'] = $this_dept->department->name;
			$x++;
		}
		$i++;
	}
}

//print_r($departments);

/*print 'const departments = [';
foreach($departments as $department){
	print "{ label: '".$department['name']."', value: '".$department['urlname']."'},";
}
print ']';*/

echo json_encode($departments);
?>