<?
ini_set('session.use_only_cookies', 1);
session_start();
require_once("l10n.php");
echo '<?xml version="1.0" encoding="utf-8"?>'."\n";
$_SESSION["back"] = $_SERVER["SCRIPT_NAME"];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head> 
<title>fanglr - <?echo _("sort and show your stuff");?></title>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<meta http-equiv="Content-Style-Type" content="text/css" />
</head>
<body>
<?
if (array_key_exists('id', $_SESSION))
{
?>
<p><a href="/fanglr/user.html"><? echo $_SESSION["name"]; ?></a> / <a href="logout.html"><? echo _("Sign Out"); ?></a></p>
<?
}
else
{
?>
<p><a class="rpxnow" onclick="return false;"
   href="https://fanglr.rpxnow.com/openid/v2/signin?token_url=<?echo
   urlencode("http://localhost/fanglr/login.html")?>"><? echo _("Register / Sign
   In "); ?></a></p>
<?
}
if(array_key_exists("error", $_SESSION))
{
    echo "<p>"._("Fanglr is sorry: ")._($_SESSION["error"])."</p>";
    echo "<p>"._("Please don't hold it against us :(")."</p>";
    unset($_SESSION["error"]);
}
