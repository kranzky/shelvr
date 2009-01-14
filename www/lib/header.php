<?
require_once("l10n.php");
echo '<?xml version="1.0" encoding="utf-8"?>'."\n";
session_start();
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
<a class="rpxnow" onclick="return false;"
   href="https://fanglr.rpxnow.com/openid/v2/signin?token_url=<?echo
   urlencode("http://localhost/fanglr/login.html")?>"><? echo _("Register / Sign In "); ?></a>
