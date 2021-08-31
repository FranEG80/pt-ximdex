<?php
namespace XimdexProfits\Commercial;

use XimdexProfits\Commercial\interfaces\CommercialInterface;
use XimdexProfits\Shared\Traits\UtilsTrait;

class Commercial implements CommercialInterface {
  use UtilsTrait;

  private $path;
  private $method;
  private $CHARACTERS_FORMULE = ['€', '%'];

  public function __construct($getDataClass, $strategyClass, $path)
  {
    $strategy = new $strategyClass();
    $this->method = new $getDataClass($strategy, $path);
    $this->path = $path;

  }

  public function getData() 
  {
    $data = $this->method->getData();
    $categories = $data->categories;

    return $categories;
  }

  public function getFormules($data) {
    $formulesOutput = array();

    foreach ($data as $key => $value) {
      $parts = $this->getFormulesParts($value);
      $formulesOutput[$key] = $parts;
    }

    return $formulesOutput;
  }

  private function getFormulesParts($str)
  {
    $initialPos = false;
    $parts = array();
    $positions = array_map(function($character) use ($str, &$initialPos) {
      $pos = $this->calculatePos($str, $character);
      $output = ['character' => $character];
      if ($pos === false) {
        $output['position'] = -1;
        $initialPos = $output;
      } else if (!$initialPos || $initialPos['position'] > $pos) {
        $output['position'] = $pos;
        $initialPos = $output;
      } else {
        $output['position'] = $pos;
      }
      return $output;
    }, $this->CHARACTERS_FORMULE);

    foreach ($positions as $key => $value) {
      $character = $value['character'];
      $position = $value['position'];
      $initial = false;
      $end = false;

      if ($value['position'] === -1) {
        $parts[] = array('type' => $character, 'value' => 0);
        continue;
      }

      if ($initialPos['position'] === $value['position']) {
        $initial = 0;
        $end = $value['position'];
      } else {
        $initial = $positions[$key === 0 ? $key + 1 : $key - 1]['position'] + strlen($character);
        $end = strlen($str) - strlen($character);
      }
      $out = substr($initial, $end);
      $out = $this->getRawValue($out, $this->CHARACTERS_FORMULE);
      $out = ['type' => $character, 'value' => $out];
      ($initialPos['position'] === $value['position'])
        ? array_unshift($parts, $out)
        : array_push($parts, $out);
    }
    // TODO: Fix function value returned is always 0
    return $parts;
  }

  private function getEuroFormule($cost, $value)
  {
    return $cost + $value;
  }

  private function getPercentForumle($cost, $value)
  {
    return $cost + ($cost * $value / 100);
  }
}