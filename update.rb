#!/usr/bin/env ruby

require 'fileutils'

LIVE = """<? $GLOBALS['fanglr'] = FANGLR_LIVE; ?>"""
OFFLINE = """<? $GLOBALS['fanglr'] = FANGLR_OFFLINE; ?>"""

#===============================================================================
def filteredCopy(options, source, target, indent = "")
    puts "#{indent}Copying #{source} to #{target}..."
    blob = File.open(source, "rb") { |file| file.read }
    blob.gsub!("#HOME#", options.yaml['home'])
    blob.gsub!("#SITE#", options.yaml['url'])
    blob.gsub!("#WEBROOT#", options.yaml['webroot'])
    FileUtils.mkdir_p(File.dirname(target))
    File.open(target, "wb") { |file| file.puts blob }
end

#-------------------------------------------------------------------------------
def deploy(options)
    def _recursiveCopy(options, source, target, path = "")
        dir = File.join(source, path)
        Dir.foreach(dir) do |name|
            next if name =~ /^\./
            file = File.join(dir, name)
            if File.directory?(file)
                _recursiveCopy(options, source, target, File.join(path, name))
            else
                dest = File.join(target, path, name)
                filteredCopy(options, file, dest, "    ")
            end
        end
    end
    source = File.join(options.git, options.source)
    target = File.join(options.yaml['webroot'], options.target)
    puts "Deploying #{source} to #{target}..."
    FileUtils.rm_rf(target)
    _recursiveCopy(options, source, target)
end

#-------------------------------------------------------------------------------
def config(options)
    def _copyConfig(options, file, target)
        source = File.join(options.git, 'conf', file)
        filteredCopy(options, source, File.join(target, file))
    end
    _copyConfig(options, 'httpd.conf', options.yaml['config']['apache'])
    _copyConfig(options, 'php.ini', options.yaml['config']['php'])
    _copyConfig(options, 'my.ini', options.yaml['config']['mysql'])
end

#-------------------------------------------------------------------------------
def live(options)
    puts "Setting server to live mode..."
    target = File.join(options.yaml['webroot'],
                       options.target,'lib','server_mode.php')
    File.open(target, "wb") { |file| file.puts LIVE }
end

#-------------------------------------------------------------------------------
def offline(options)
    puts "Setting server to offline mode..."
    target = File.join(options.yaml['webroot'],
                       options.target,'lib','server_mode.php')
    File.open(target, "wb") { |file| file.puts OFFLINE }
end

#-------------------------------------------------------------------------------
def start(options)
    puts "Starting mysql..."
    `net start wampmysqld`
    puts "Starting apache..."
    `net start wampapache`
end

#-------------------------------------------------------------------------------
def stop(options)
    puts "Stopping apache..."
    `net stop wampapache`
    puts "Stopping mysql..."
    `net stop wampmysqld`
end

#===============================================================================
if __FILE__ == $0
    require 'optparse'
    require 'ostruct'
    require 'yaml'

    options = OpenStruct.new
    options.deploy = false
    options.restart = false
    options.config = false
    options.source = 'www'
    options.target = 'fanglr'
    options.git = "."
    options.live = false
    options.offline = false
    options.platform = nil
    options.yaml = nil

    options.platform = 'windows' if RUBY_PLATFORM =~ /win/
    options.platform = 'linux' if RUBY_PLATFORM =~ /linux/

    opts = OptionParser.new do |opts|
        opts.banner = "Usage: #{$0} [options] [source]"
        opts.on("-s", "--source DIR", "#{options.source}") do |dir|
            options.source = dir
        end
        opts.on("-t", "--target DIR", "#{options.target}") do |dir|
            options.target = dir
        end
        opts.on("-d", "--deploy", "Deploy to the web server.") do
            options.deploy = true
        end
        opts.on("-c", "--config", "Update server configuration.") do
            options.config = true
        end
        opts.on("-r", "--restart", "Restart the server.") do
            options.restart = true
        end
        opts.on("-l", "--live", "Put fanglr online.") do
            options.live = true
        end
        opts.on("-o", "--offline", "Put fanglr offline.") do
            options.offline = true
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
        unless options.deploy or options.restart or options.config or options.live or options.offline
            raise OptionParser::MissingArgument, "nothing to do"
        end
        if options.live and options.offline
            raise OptionParser::AmbiguousArgument, "can't be live and offline"
        end
        if not options.platform
            raise OptionParser::InvalidOption, "cannot determine platform"
        end
    rescue OptionParser::InvalidOption,
           OptionParser::NeedlessArgument,
           OptionParser::AmbiguousArgument,
           OptionParser::MissingArgument => message
        puts message
        puts "(run '#{$0} --help' for more info)"
        exit 1
    end

    path = File.join(options.git, 'conf', 'update.yaml')
    yaml = File.open(path, "rb") { |file| YAML::load(file) }
    options.yaml = yaml[options.platform]

    stop(options) if options.restart
    config(options) if options.config
    deploy(options) if options.deploy
    live(options) if options.live
    offline(options) if options.offline
    start(options) if options.restart
end
