class Todo::TaskListsController < TodoController
  before_action :set_todo_task_list, only: [:show, :update, :destroy]

  # GET /todo/task_lists.json
  def index
    @todo_task_lists = task_lists_scope
  end

  # GET /todo/task_lists/1.json
  def show
  end

  # POST /todo/task_lists.json
  def create
    @todo_task_list = Todo::TaskList.new(todo_task_list_params)

    if @todo_task_list.save
      render :show, status: :created
    else
      render_error @todo_task_list, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todo/task_lists/1.json
  def update
    if @todo_task_list.update(todo_task_list_params)
      render :show, status: :ok, location: @todo_task_list
    else
      render_error @todo_task_list, status: :unprocessable_entity
    end
  end

  # DELETE /todo/task_lists/1.json
  def destroy
    @todo_task_list.destroy
  end

  private
    def task_lists_scope
      current_todo_user.try(:task_lists) || Todo::TaskList
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_todo_task_list
      @todo_task_list = task_lists_scope.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_task_list_params
      params.require(:todo_task_list).permit(:title).merge(
        'user_id' => current_todo_user.try(:id)
      )
    end
end
