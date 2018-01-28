RSpec.shared_context 'todo_controller' do
  let(:json) { JSON.parse response.body, symbolize_names: true }

  before do
    @request.env['devise.mapping'] = Devise.mappings[:todo_user]
  end
end

RSpec.shared_examples 'todo_auth_success' do |status|
  it 'Returns user data and authentication_token' do
    json.keys.should eq(%i[data authentication_token])
  end

  it 'Returns an user' do
    json[:data].should_not be_empty
  end

  it 'Creates an authentication_token' do
    json[:authentication_token].should_not be_empty
  end

  it 'Responds with status #{status}' do
    response.status.should == status
  end
end

RSpec.shared_examples 'todo_auth_error' do |status|
  it 'Returns error data and authentication_token' do
    json.keys.should eq(%i[errors authentication_token])
  end

  it 'Responds with status #{status}' do
    response.status.should == status
  end
end
