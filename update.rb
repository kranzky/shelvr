#!/usr/bin/env ruby
require 'fileutils'
FileUtils.rm_rf('c:\wamp\www\shelvr')
FileUtils.cp_r('www', 'c:\wamp\www\shelvr', :preserve => true)
