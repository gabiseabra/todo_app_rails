class Todo::TasksController < TodoController
  before_action :set_todo_task, only: [:show, :update, :destroy]

  # GET /todo/tasks.json
  def index
    @todo_tasks = Todo::Task.all
  end

  # GET /todo/tasks/1.json
  def show
  end

  # POST /todo/tasks.json
  def create
    @todo_task = Todo::Task.new(todo_task_params)

    if @todo_task.save
      render :show, status: :created, location: @todo_task
    else
      render json: @todo_task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todo/tasks/1.json
  def update
    if @todo_task.update(todo_task_params)
      render :show, status: :ok, location: @todo_task
    else
      render json: @todo_task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todo/tasks/1.json
  def destroy
    @todo_task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo_task
      @todo_task = Todo::Task.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_task_params
      params.require(:todo_task).permit(:task_list_id, :position, :checked, :body)
    end
end
