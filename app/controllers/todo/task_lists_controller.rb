class Todo::TaskListsController < Todo::BaseController
  before_action :set_todo_task_list, only: [:show, :update, :destroy]

  # GET /todo/task_lists.json
  def index
    @todo_task_lists = Todo::TaskList.all
  end

  # GET /todo/task_lists/1.json
  def show
  end

  # POST /todo/task_lists.json
  def create
    @todo_task_list = Todo::TaskList.new(todo_task_list_params)

    if @todo_task_list.save
      render :show, status: :created, location: @todo_task_list
    else
      render json: @todo_task_list.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todo/task_lists/1.json
  def update
    if @todo_task_list.update(todo_task_list_params)
      render :show, status: :ok, location: @todo_task_list
    else
      render json: @todo_task_list.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todo/task_lists/1.json
  def destroy
    @todo_task_list.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo_task_list
      @todo_task_list = Todo::TaskList.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_task_list_params
      params.require(:todo_task_list).permit(:user_id, :title, :tasks)
    end
end
