<?
require_once("l10n.php");
require_once("gravatar.php");
print '<?xml version="1.0" encoding="utf-8"?>'."\n";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head> 
<title>fanglr - organize and share your game library</title>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<meta http-equiv="Content-Style-Type" content="text/css" />
</head>
<body>
<h1><?echo _("Hello World");?></h1>
<?
$email = "JasonHutchens@gmail.com";
$default = "";
$gravatar = new Gravatar($email, $default);
$gravatar->size = 128;
$gravatar->rating = "G";
$gravatar->setDefault("http://friedcellcollective.net/monsterid/".
                      $gravatar->gravatar_id."/128");
echo $gravatar;
# API: 2013e9e4d57d026d062ffe67f764badd76ef925a
?>
</body>
</html>
