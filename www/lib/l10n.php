<?require_once("locale/supported.php");?>
<?
$arr=explode(",", str_replace(";", ",", $_SERVER['HTTP_ACCEPT_LANGUAGE']));
if (array_key_exists('language', $_SESSION))
{
    array_unshift($arr, $_SESSION["language"]);
}
foreach($arr as $val)
{
    if($val[1]=='=') continue;
    $language = str_replace("-", "_", $val);
    if(array_key_exists($language, $supported))
    {
        putenv("LANGUAGE=$language");
        break;
    }
}
$domain = 'messages';
bindtextdomain($domain, "./locale");
bind_textdomain_codeset($domain, "UTF-8");
textdomain($domain);
?>
