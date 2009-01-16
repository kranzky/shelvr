<?
define('FANGLR_LIVE', 0);
define('FANGLR_OFFLINE', 1);
define('FANGLR_COMING', 2);
require_once("server_mode.php");
error_reporting(E_ALL);
ini_set("display_errors", 0);
ini_set('session.use_only_cookies', 1);
session_start();
switch ($GLOBALS['fanglr'])
{
    case FANGLR_LIVE:
    {
        mysql_pconnect('localhost', 'fanglr', 'adPwvVm73wB4vSQm');
        mysql_select_db('fanglr');
        break;
    }
    case FANGLR_OFFLINE:
    {
        require_once("offline.php");
        break;
    }
    case FANGLR_COMING:
    {
        require_once("coming_soon.php");
        break;
    }
    default:
    {
        error_log("Server is in a bad mode. Must be LIVE, OFFLINE or COMING.");
        break;
    }
}
?>
