<?
    $supported = array();
    $supported["pt_br"] = true;
    $supported["en"] = true;
    $supported["en_us"] = true;
    $supported["en_uk"] = true;
    $supported["en_au"] = true;
    # TEST BELOW...
    if (array_key_exists("id", $_SESSION))
    {
        $_SESSION["language"] = 'pt_br';
    }
?>
