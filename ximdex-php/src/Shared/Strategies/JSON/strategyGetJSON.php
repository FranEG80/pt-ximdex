<?php
namespace XimdexProfits\Shared\Strategies\JSON;

use XimdexProfits\Shared\Strategies\Common\interfaceStrategyGetData;
use XimdexProfits\Shared\Strategies\Common\strategyGetData;

class strategyGetJSON  extends strategyGetData implements interfaceStrategyGetData {
 
  public function getData()
  {
    $path = $this->getPathfile();
    $json = $this->getJson($path);
    return $json;
  }

  public function getJson($path) 
  {
    $string = file_get_contents($path);
    $json = json_decode($string);
    return $json;
  }
}