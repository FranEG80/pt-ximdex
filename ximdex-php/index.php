<?php

use XimdexProfits\Main\Main;

include __DIR__ . '/src/include.php';

$params = array();

// TODO: Handler $argv for pass arguments to script `composer start -- --logistic={path_to_file} --commercial={path_to_file}`
if (isset($argv)) {
  var_dump($argv);
}
// Demo mockupl
$params['logisticPath'] = __DIR__ . '/src/__MOCK__/demo/logistica.csv';
$params['commercialPath'] = __DIR__ . '/src/__MOCK__/demo/comercial.json';

$main = new Main($params);
$main->execute();
