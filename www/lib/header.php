<?
require_once("config.php");
require_once("l10n.php");
echo '<?xml version="1.0" encoding="utf-8"?>'."\n";
$_SESSION["back"] = $_SERVER["SCRIPT_NAME"];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head> 
<title>fanglr - <? echo _("sort and show your stuff"); ?></title>
<?
if ($GLOBALS['fanglr'] != FANGLR_LIVE)
{
    echo '<meta name="robots" content="noindex, nofollow">'."\n";
}
?>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<script src="scripts/flXHR.js" type="text/javascript" ></script>
<script src="scripts/prototype.js" type="text/javascript"></script>
<script src="scripts/scriptaculous.js" type="text/javascript"></script>


<link href="mechanics.css" rel="stylesheet" type="text/css">
<link href="default-theme.css" rel="stylesheet" type="text/css">

</head>
<body>
<div id="header">
<img src="title.png"><img src="fangrheader.png">
</div>
<div id="main">
<table id="maintable" align="center">
<tr><td>
<div class="menubar">
<?
if ($GLOBALS['fanglr'] == FANGLR_LIVE)
{
if (array_key_exists('id', $_SESSION))
{
?>
<a href="/#HOME#"><? echo _("Home"); ?></a> |
<? echo _("Explore"); ?> |
<a href="/#HOME#user.html"><? echo $_SESSION["name"]; ?></a> |
<? echo _("Settings"); ?> |
<a href="logout.html"><? echo _("Sign Out"); ?></a>
<?
}
else
{
?>
<a href="/#HOME#"><? echo _("Home"); ?></a> |
<? echo _("Explore") ?> |
<a class="rpxnow" onclick="return false;"
   href="https://fanglr.rpxnow.com/openid/v2/signin?token_url=<?echo
   urlencode("#SITE##HOME#login.html")?>"><? echo _("Sign In"); ?></a>
<?
}
}
?>
</div></td></tr>
<tr><td id="contentpane" class="pane">