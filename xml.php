<!DOCTYPE html>
<meta charset="utf-8"/>
<html>
<body>
<?php
$json='{ "test":[';
$sxml = simplexml_load_file("http://www.varzesh3.com/rss/all");
foreach($sxml->channel->item as $type){
$name=$type->title;
$desc=$type->description;
$json=$json.'{"title":"'.$name.'","desc":"'.$desc.'"},';
}

$sxml = simplexml_load_file("http://www.varzesh3.com/rss/domesticFootball");
foreach($sxml->channel->item as $type){
$name=$type->title;
$desc=$type->description;
$json=$json.'{"title":"'.$name.'","desc":"'.$desc.'"},';
}


$json=$json."]}";
echo $json=str_replace("},]}","}]}",$json);
//https://gigaom.com/tag/internet-of-things-podcast/feed
?>
</body>
</html>