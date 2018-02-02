class Todo::TaskListsController < TodoController
  before_action :set_todo_task_list, only: %i[show update destroy]
  before_action :set_todo_user
  before_action :authenticate_todo_user, only: %i[create update destroy]
  before_action :validate_task_list_scope, only: %i[show]

  # GET /api/users/1/lists.json
  def index
    @todo_task_lists = @todo_user.task_lists
    @todo_task_lists = @todo_task_lists.visible unless is_current_todo_user?
    @todo_task_lists = @todo_task_lists.paginate(page: params.fetch(:page, 1))
  end

  # GET /api/lists/1.json
  def show
    @todo_task_list
  end

  # POST /api/users/1/lists.json
  def create
    @todo_task_list = Todo::TaskList.new(todo_task_list_params)
    @todo_user.task_lists << @todo_task_list

    if @todo_task_list.save
      render :show, status: :created
    else
      render_error @todo_task_list, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/lists/1.json
  def update
    if @todo_task_list.update(todo_task_list_params)
      render :show, status: :ok
    else
      render_error @todo_task_list, status: :unprocessable_entity
    end
  end

  # DELETE /api/lists/1.json
  def destroy
    @todo_task_list.destroy
  end

  private

  def set_todo_user
    @todo_user = Todo::User.find(params[:user_id]) if params[:user_id]
    @todo_user ||= @todo_task_list.user
  end

  def set_todo_task_list
    @todo_task_list = Todo::TaskList.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def todo_task_list_params
    params.require(:todo_task_list).permit(:title, :public)
  end

  def validate_task_list_scope
    head 401 unless is_current_todo_user? || @todo_task_list.public?
  end
end
