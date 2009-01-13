#!/usr/bin/env ruby
require 'fileutils'
FileUtils.rm_rf('c:\wamp\www\shelvr')
FileUtils.rm_rf('c:\wamp\www\fanglr')
FileUtils.cp_r('www', 'c:\wamp\www\fanglr', :preserve => true)
