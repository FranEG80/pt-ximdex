<?php
namespace XimdexProfits\Shared\Traits;

trait UtilsTrait
{
  use NumbersTrait;

  public function calculatePos($string, $character)
  {
    return strpos($string, $character);
  }

  public function getRawValue($string, $characters)
  {
    $stringWithoutCharacters = $this->removeCharacter($string, $characters);
    $number = $this->toNumber(str_replace([",", "'"], '.', $string));
    return is_nan($number) ? 0 : $number;
  }

  public function removeCharacter($string, $characters)
  {
    if (!is_array($characters)) $characters = [$characters];
    return str_replace($characters, '', $string);
  }
}