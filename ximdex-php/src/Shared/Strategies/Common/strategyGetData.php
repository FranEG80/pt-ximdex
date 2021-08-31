<?php
namespace XimdexProfits\Shared\Strategies\Common;

class strategyGetData {
  private $path;

  public function setPathfile($pathFile) 
  {
    $this->path = $pathFile;
  }

  public function getPathfile()
  {
    return $this->path;
  }
 
}