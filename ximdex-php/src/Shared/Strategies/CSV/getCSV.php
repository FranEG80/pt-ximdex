<?php
namespace XimdexProfits\Shared\Strategies\CSV;

use XimdexProfits\Shared\Strategies\Common\interfaceGetData;

class getCSV implements interfaceGetData {
  
  private strategyGetCSV $strategy;
  private string $pathFile;

  public function __construct(strategyGetCSV $strategy = null, string $pathFile)
  {
    if (is_null($strategy)) {
      $strategy = new strategyGetCSV();
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