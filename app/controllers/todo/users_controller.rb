class Todo::UsersController < TodoController
  before_action :set_todo_user, only: %i[show]

  # GET /api/users/1.json
  def show
  end

  private

  def set_todo_user
    @todo_user = Todo::User.find(params[:id])
  end
end
