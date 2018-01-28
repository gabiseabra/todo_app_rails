RSpec.shared_context 'todo_controller' do
  let(:json) { JSON.parse response.body, symbolize_names: true }

  before do
    @request.env['devise.mapping'] = Devise.mappings[:todo_user]
  end
end
