<?php
namespace XimdexProfits\Shared\Strategies\CSV;

use XimdexProfits\Shared\Strategies\Common\interfaceStrategyGetData;
use XimdexProfits\Shared\Strategies\Common\strategyGetData;
use XimdexProfits\Shared\Traits\NumbersTrait;

class strategyGetCSV extends strategyGetData implements interfaceStrategyGetData {
  use NumbersTrait;

  CONST SEPARATOR = ';';

  public function getData()
  {
    $path = $this->getPathfile();
    $csv = $this->getCSV($path);
    return $csv;
  }

  public function getCSV($path)
  {
    $output = array();
    $header = false;
    $open = fopen($path, 'r');
    while ($data = fgetcsv($open, 1000, self::SEPARATOR)) 
    {
      if (!$header) {
        $header = $data;
        continue;
      }
      $line = $this->getParsedData($data, $header, $output);
      $category = $line['category'];
      if (isset($output[$category])) {
          $output[$category]['quantity'] += $line['quantity'];
          continue;
      }
      $output[$category] = $line;
    }
    fclose($open);
    return $output;
  }

  private function getParsedData($row, $header)
  {
    return array(
      'category' => $row[array_search('CATEGORY', $header)],
      'cost' => $this->getCostPrice($row[array_search('COST', $header)]),
      'quantity' => $this->getQuantity($row[array_search('QUANTITY', $header)]),
    );
  }
  
  private function getQuantity($q)
  {
    return $this->parseQuantity($q);
  }
  
  private function getCostPrice($cost)
  {
    return $this->parseCurrency($cost);
  }
}