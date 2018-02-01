class HomeController < ApplicationController
  def index
    @todo_task_lists = Todo::TaskLists.visible
  end
end
