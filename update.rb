#!/usr/bin/env ruby

require 'fileutils'

#===============================================================================
def deploy(options)
    def _recursiveCopy(options, source, target, path = "")
        dir = File.join(source, path)
        Dir.foreach(dir) do |name|
            next if name =~ /^\./
            file = File.join(dir, name)
            if File.directory?(file)
                _recursiveCopy(options, source, target, File.join(path, name))
            else
                blob = File.open(file, "rb") { |file| blob = file.read }
                blob.gsub!("#HOME#", options.home)
                blob.gsub!("#SITE#", options.url)
                dest = File.join(target, path)
                FileUtils.mkdir_p(dest)
                dest = File.join(dest, name)
                File.open(dest, "wb") { |file| file.puts blob }
            end
        end
    end
    source = File.join(options.git, options.source)
    target = File.join(options.webroot, options.target)
    puts "Deploying #{source} to #{target}..."
    FileUtils.rm_rf(target)
    _recursiveCopy(options, source, target)
end

#-------------------------------------------------------------------------------
def config(options)
    def _copyConfig(options, file, target)
        source = File.join(options.git, 'conf', file)
        puts "Copying #{source} to #{target}..."
        FileUtils.cp(source, target)
    end
    _copyConfig(options, 'httpd.conf', options.apache)
    _copyConfig(options, 'php.ini', options.php)
    _copyConfig(options, 'my.ini', options.mysql)
end

#-------------------------------------------------------------------------------
def start(options)
    puts `net start wampmysqld`
    puts `net start wampapache`
end

#-------------------------------------------------------------------------------
def stop(options)
    puts `net stop wampapache`
    puts `net stop wampmysqld`
end

#===============================================================================
if __FILE__ == $0
    require 'optparse'
    require 'ostruct'

    options = OpenStruct.new
    options.deploy = false
    options.restart = false
    options.config = false
    options.webroot = 'c:\wamp\www'
    options.url = 'http://localhost/'
    options.home = 'fanglr/'
    options.source = 'www'
    options.target = 'fanglr'
    options.apache = 'c:\wamp\bin\apache\Apache2.2.11\conf'
    options.php = 'c:\wamp\bin\apache\Apache2.2.11\bin'
    options.mysql = 'c:\wamp\bin\mysql\mysql5.1.30'
    options.git = "."

    opts = OptionParser.new do |opts|
        opts.banner = "Usage: #{$0} [options] [source]"
        opts.on("-w", "--webroot PATH", "#{options.webroot}") do |path|
            options.webroot = path
        end
        opts.on("-u", "--url URL", "#{options.url}") do |url|
            options.url = url
        end
        opts.on("-h", "--home PAGE", "#{options.home}") do |page|
            options.home = page
        end
        opts.on("-s", "--source DIR", "#{options.source}") do |dir|
            options.source = dir
        end
        opts.on("-t", "--target DIR", "#{options.target}") do |dir|
            options.target = dir
        end
        opts.on("-a", "--apache DIR", "#{options.apache}") do |dir|
            options.apache = dir
        end
        opts.on("-p", "--php DIR", "#{options.php}") do |dir|
            options.php = dir
        end
        opts.on("-m", "--mysql DIR", "#{options.mysql}") do |dir|
            options.mysql = dir
        end
        opts.on("-h", "--home PAGE", "#{options.home}") do |page|
            options.home = page
        end
        opts.on("-d", "--deploy", "Deploy to live.") do
            options.deploy = true
        end
        opts.on("-c", "--config", "Update server configuration.") do
            options.config = true
        end
        opts.on("-r", "--restart", "Restart the server.") do
            options.restart = true
        end
        opts.on("-h", "--help", "Show this message.") do
            puts opts
            exit 0
        end
    end

    begin
        opts.parse!(ARGV)
        options.git = ARGV[0] if ARGV.length == 1
        if ARGV.length > 1
            raise OptionParser::NeedlessArgument, "this is not an argument"
        end
        unless options.deploy or options.restart or options.config
            raise OptionParser::MissingArgument, "nothing to do"
        end
    rescue OptionParser::InvalidOption,
           OptionParser::NeedlessArgument,
           OptionParser::AmbiguousArgument,
           OptionParser::MissingArgument => message
        puts message
        puts "(run '#{$0} --help' for more info)"
        exit 1
    end

    stop(options) if options.restart
    config(options) if options.config
    deploy(options) if options.deploy
    start(options) if options.restart
end
