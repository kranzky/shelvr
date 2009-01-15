#!/usr/bin/env ruby
require 'fileutils'
FileUtils.rm_rf('c:\wamp\www\fanglr')
FileUtils.rm_rf('c:\wamp\www\demo')
FileUtils.rm_rf('c:\wamp\www\amazontest')
FileUtils.cp_r('www', 'c:\wamp\www\fanglr')
FileUtils.cp_r('demo', 'c:\wamp\www\demo')
FileUtils.cp_r('amazontest', 'c:\wamp\www\amazontest')
