<?php
namespace XimdexProfits\Logistic;

use XimdexProfits\Logistic\interfaces\LogisticInterface;
use XimdexProfits\Shared\Traits\NumbersTrait;

class Logistic implements LogisticInterface {

  use NumbersTrait;
  
  private $path;
  private $method;

  public function __construct($getDataClass, $strategyClass, $path)
  {
    $strategy = new $strategyClass();
    $this->method = new $getDataClass($strategy, $path);
    $this->path = $path;
  }

  public function getData() 
  {
    return $this->method->getData();
  }
}