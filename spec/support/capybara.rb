require 'capybara/rspec'
require 'capybara-screenshot/rspec'

if ENV['SELENIUM_SERVER']
  remote = ENV['SELENIUM_SERVER']
  port = ENV['SELENIUM_PORT'] || 4444
  browser = (ENV['SELENIUM_BROWSER'] || 'chrome').to_sym
  Capybara.register_driver :selenium_remote do |app|
    url = "http://#{remote}:#{port}/wd/hub"
    client = Selenium::WebDriver::Remote::Http::Default.new
    client.open_timeout = 90 # Default is 60
    client.read_timeout = 300 # Default is 60
    Capybara::Selenium::Driver.new(
      app,
      browser: :remote,
      url: url,
      http_client: client,
      desired_capabilities: browser
    )
  end

  Capybara.javascript_driver = :selenium_remote
end

Capybara.default_max_wait_time = 10
Capybara.app_host    = ENV.fetch('CAPYBARA_APP_HOST', 'https://localhost:3001')
Capybara.server_host = ENV.fetch('CAPYBARA_SERVER_HOST', '0.0.0.0')
Capybara.server_port = ENV.fetch('CAPYBARA_SERVER_PORT', '3001')
