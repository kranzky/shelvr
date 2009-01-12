<?
require_once("l10n.php");
require_once("gravatar.php");
print '<?xml version="1.0" encoding="utf-8"?>'."\n";
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head> 
<title>shelvr</title>
<meta http-equiv="content-type" content="text/html;charset=utf-8" />
<meta http-equiv="Content-Style-Type" content="text/css" />
</head>
<body>
<h1><?echo _("Hello World");?></h1>
<?
$email = "JasonHutchens@gmail.com";
$default = "http://members.scottsdaleculinaryfestival.org/portals/18/default_avatar.jpg"; 
$gravatar = new Gravatar($email, $default);
$gravatar->size = 128;
$gravatar->rating = "G";
echo $gravatar;
?>
</body>
</html>
