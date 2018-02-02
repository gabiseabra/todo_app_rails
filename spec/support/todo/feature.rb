module Todo::Test
  module FeatureHelpers
    def should_finish_loading
      page.save_screenshot('screenshot.png')
      page.should have_no_selector('.Shared-Loader__loading')
    end
  end
end
