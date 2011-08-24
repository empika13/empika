<?php

header('Content-Type: text/plain');

$json = array(
    'success' => true
);

sleep(2);

print json_encode($json);

?>