<?php
namespace XimdexProfits\Shared\Strategies\JSON;

use XimdexProfits\Shared\Strategies\Common\interfaceGetData;

class getJson implements interfaceGetData {
  private strategyGetJSON $strategy;
  private string $pathFile;
  
  public function __construct(strategyGetJSON $strategy = null, string $pathFile)
  {
    if (is_null($strategy)) {
      $strategy = new strategyGetJSON();
    }
    $this->pathFile = $pathFile;
    $this->strategy = $strategy;
    
    $this->strategy->setPathfile($this->pathFile);
  }

  public function getData()
  {
    return $this->strategy->getData();
  }
}
 