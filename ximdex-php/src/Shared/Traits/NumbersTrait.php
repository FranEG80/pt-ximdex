<?php
namespace XimdexProfits\Shared\Traits;

CONST MILLARS_SEPARATOR = '.';
CONST DECIMALS_SEPARATOR = ',';
CONST CURRENCY_CHARACTER = '€';

trait NumbersTrait
{
  public function parseQuantity($value) {
    $num = str_replace(MILLARS_SEPARATOR, '', $value);
    return $this->toNumber($num);
  }
  public function parseCurrency($value) {
    $str = str_replace([MILLARS_SEPARATOR, CURRENCY_CHARACTER], '', $value);
    $str = str_replace(DECIMALS_SEPARATOR, '.', $str);
    $number = $this->toNumber($str);
    return $this->toFixedNumber($number, 2);
  }

  public function toNumber($num)
  {
    return $this->toFixedNumber(floatval($num), 2);
  }

  public function toFixedNumber($num, $decimals)
  {
    return round($num, $decimals);
  }
}