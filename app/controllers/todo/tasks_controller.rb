class Todo::TasksController < TodoController
  before_action :set_todo_task_list
  before_action :set_todo_task, only: [:show, :update, :destroy]

  # GET /todo/tasks.json
  def index
    @todo_tasks = @todo_task_list.tasks
  end

  # GET /todo/tasks/1.json
  def show
  end

  # POST /todo/tasks.json
  def create
    @todo_task = Todo::Task.new(todo_task_params)

    if @todo_task.save
      render :show, status: :created
    else
      render_error @todo_task, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todo/tasks/1.json
  def update
    if @todo_task.update(todo_task_params)
      render :show, status: :ok
    else
      render_error @todo_task, status: :unprocessable_entity
    end
  end

  # DELETE /todo/tasks/1.json
  def destroy
    @todo_task.destroy
  end

  private
    def task_lists_scope
      current_todo_user.try(:task_lists)
    end

    def set_todo_task_list
      @todo_task_list = task_lists_scope.find(params[:task_list_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_todo_task
      @todo_task = @todo_task_list.tasks.find(params[:id]) if @todo_task_list
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_task_params
      params.require(:todo_task).permit(:position, :checked, :body).merge(
        task_list_id: @todo_task_list.try(:id)
      )
    end
end
