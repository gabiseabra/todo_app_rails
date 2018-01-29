module Todo::Test
  module ControllerMacros
    def authentication_context(&block)
      context 'with authenticated user' do
        before(:each) { sign_in! }

        class_exec(&block)
      end

      context 'without authenticated user' do
        before { sign_out! }

        it 'responds with status 401' do
          request!
          response.status.should == 401
        end
      end
    end
  end
end
