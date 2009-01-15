#!/usr/bin/env ruby
require 'fileutils'
FileUtils.rm_rf('c:\wamp\www\shelvr')
FileUtils.rm_rf('c:\wamp\www\fanglr')
FileUtils.rm_rf('c:\wamp\www\demo')
FileUtils.cp_r('www', 'c:\wamp\www\fanglr')
