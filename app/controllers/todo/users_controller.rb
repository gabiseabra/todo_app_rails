class Todo::UsersController < TodoController
  before_action :set_todo_user, only: [:show, :update, :destroy]

  # GET /todo/users
  # GET /todo/users.json
  def index
    @todo_users = Todo::User.all
  end

  # GET /todo/users/1
  # GET /todo/users/1.json
  def show
  end

  # POST /todo/users
  # POST /todo/users.json
  def create
    @todo_user = Todo::User.new(todo_user_params)

    if @todo_user.save
      render :show, status: :created, location: @todo_user
    else
      render json: @todo_user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todo/users/1
  # PATCH/PUT /todo/users/1.json
  def update
    if @todo_user.update(todo_user_params)
      render :show, status: :ok, location: @todo_user
    else
      render json: @todo_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todo/users/1
  # DELETE /todo/users/1.json
  def destroy
    @todo_user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo_user
      @todo_user = Todo::User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_user_params
      params.require(:todo_user).permit(:username, :email, :password)
    end
end
