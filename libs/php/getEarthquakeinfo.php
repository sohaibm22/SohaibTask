<?php
$country = isset($_GET['country']) ? $_GET['country'] : 'all';
$lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';
$username = 'sohaib2004';

$url = "http://api.geonames.org/countryInfoJSON?country={$country}&lang={$lang}&username={$username}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);
curl_close($ch);

echo $result;
?>