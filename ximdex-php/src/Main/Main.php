<?php
namespace XimdexProfits\Main;

use XimdexProfits\Commercial\Commercial;
use XimdexProfits\Logistic\Logistic;

CONST LOGISTIC_METHOD_DEFAULT = 'XimdexProfits\Shared\Strategies\CSV\getCSV';
CONST LOGISTIC_STRATEGY_DEFAULT = 'XimdexProfits\Shared\Strategies\CSV\strategyGetCSV';
CONST COMMERCIAL_METHOD_DEFAULT = 'XimdexProfits\Shared\Strategies\JSON\getJson';
CONST COMMERCIAL_STRATEGY_DEFAULT = 'XimdexProfits\Shared\Strategies\JSON\strategyGetJson';

class Main {
  private Logistic $Logistic;
  private Commercial $Commercial;

  public function __construct($params)
  {
    $logisticMethod = isset($params['logisticMethod']) ? $params['logisticMethod'] : LOGISTIC_METHOD_DEFAULT;
    $logisticStrategy = isset($params['logisticStrategy']) ? $params['logisticStrategy'] : LOGISTIC_STRATEGY_DEFAULT;

    $commercialMethod = isset($params['commercialMethod']) ? $params['commercialMethod'] : COMMERCIAL_METHOD_DEFAULT;
    $commercialStrategy = isset($params['commercialStrategy']) ? $params['commercialStrategy'] : COMMERCIAL_STRATEGY_DEFAULT;
    
    $this->Commercial = new Commercial($commercialMethod, $commercialStrategy, $params['commercialPath']);
    $this->Logistic = new Logistic($logisticMethod, $logisticStrategy, $params['logisticPath']);
  }

  public function execute()
  {
    $commercialData = $this->getDataCommercial();
    $commercialFormules = $this->getFormulesCommercial($commercialData);
    
    $logisticData = $this->getDataLogistic();

    // TODO: loop in $logisticData with parts of $commercialFormules for calculate profits per units
    // and then multipy at quantity and get profits per category
    // finally print output
    

  }

  private function getDataCommercial()
  {
    return  $this->Commercial->getData();
  }

  private function getDataLogistic()
  {
    return  $this->Logistic->getData();
  }
  
  private function getFormulesCommercial($data)
  {
    return $this->Commercial->getFormules($data);
  }
}