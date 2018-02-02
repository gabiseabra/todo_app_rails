class Todo::HomeController < TodoController
  # GET /api/index.json
  def index
    @todo_task_lists = Todo::TaskList.visible.paginate(page: params.fetch(:page, 1))
    render 'todo/task_lists/index'
  end
end
