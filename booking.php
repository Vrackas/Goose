<?php

$ch = curl_init();
// $query = http_build_query($data, '', '&');
// echo $query;
curl_setopt($ch, CURLOPT_URL,"http://testapi.iati.com/rest/".$_GET['query']."/FF2DA8C0E6BEA332F970F6CB56A0C953");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/xml',
));
// In real life you should use something like:
// curl_setopt($ch, CURLOPT_POSTFIELDS,
//          http_build_query(array('postvar1' => 'value1')));

// Receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec($ch);

curl_close ($ch);

echo json_encode($server_output);

// // Further processing ...
// if ($server_output == "OK") {  } else { ... }