RSpec.shared_context 'todo_controller' do
  let(:json) { JSON.parse response.body, symbolize_names: true }
  let(:sign_in!) do
    sign_in user, scope: :todo_user
    @request.env['X-User-Email'] = user.email
    @request.env['X-User-Token'] = user.authentication_token
  end
  let(:sign_out!) do
    sign_out :todo_user
  end

  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:todo_user]
    @request.accept = 'application/json'
    @request.env['X-User-Email'] = nil
    @request.env['X-User-Token'] = nil
  end
end

RSpec.shared_examples 'todo_api_success' do |status:, template: nil|
  it 'returns resource data' do
    request!
    if template
      response.should render_template(template)
    else
      json.keys.should include(:data)
      json[:data].should_not be_empty
    end
  end

  it "responds with status #{status}" do
    request!
    response.status.should == status
  end
end

RSpec.shared_examples 'todo_api_error' do |status:, template: nil|
  it 'returns error data' do
    request!
    if template
      response.should render_template(template)
    else
      json.keys.should include(:errors)
      json[:errors].should_not be_empty
    end
  end

  it "responds with status #{status}" do
    request!
    response.status.should == status
  end
end
