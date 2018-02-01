class Todo::TasksController < TodoController
  before_action :set_todo_task, only: %i[show update destroy]
  before_action :set_todo_task_list, only: %i[index create]
  before_action :set_todo_user
  before_action :authenticate_todo_user, only: %i[create update destroy]
  before_action :validate_task_list_scope, only: %i[index show]

  # GET /api/lists/1/tasks.json
  def index
    @todo_tasks = @todo_task_list.tasks
  end

  # GET /api/tasks/1.json
  def show
  end

  # POST /api/lists/1/tasks.json
  def create
    @todo_task = Todo::Task.new(todo_task_params)
    @todo_task_list.tasks << @todo_task

    if @todo_task.save
      render :show, status: :created
    else
      render_error @todo_task, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/tasks/1.json
  def update
    if @todo_task.update(todo_task_params)
      render :show, status: :ok
    else
      render_error @todo_task, status: :unprocessable_entity
    end
  end

  # DELETE /api/tasks/1.json
  def destroy
    @todo_task.destroy
  end

  private
    def todo_task_list
      @todo_task_list || @todo_task.task_list
    end

    def set_todo_task_list
      @todo_task_list = Todo::TaskList.find(params[:task_list_id])
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_todo_task
      @todo_task = Todo::Task.find(params[:id])
    end

    def set_todo_user
      @todo_user = todo_task_list.user
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_task_params
      params.require(:todo_task).permit(:position, :checked, :body)
    end

    def validate_task_list_scope
      head 401 unless is_current_todo_user? || todo_task_list.public?
    end
end
