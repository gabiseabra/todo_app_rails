class Todo::LikesController < TodoController
  before_action :set_todo_user
  before_action :set_todo_like, only: %i[destroy]
  before_action :authenticate_todo_user

  # GET /todo/likes
  # GET /todo/likes.json
  def index
    @todo_likes = @todo_user.likes
    @todo_likes = @todo_likes.includes(:task_list)
    @todo_likes = @todo_likes.merge(Todo::TaskList.visible_by(@todo_user)).references(:task_list)
    @todo_likes = @todo_likes.paginate(page: params.fetch(:page, 1))
  end

  # POST /todo/likes
  # POST /todo/likes.json
  def create
    @todo_like = Todo::Like.new(todo_like_params)
    @todo_user.likes << @todo_like

    if @todo_like.save
      render :show, status: :created
    else
      render_error @todo_like, status: :unprocessable_entity
    end
  end

  # DELETE /todo/likes/1
  # DELETE /todo/likes/1.json
  def destroy
    @todo_like.destroy
  end

  private
    def set_todo_user
      @todo_user = Todo::User.find(params[:user_id]) if params[:user_id]
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_todo_like
      @todo_like = Todo::Like.find_by(
        user_id: params[:user_id],
        task_list_id: params[:id]
      )
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_like_params
      params.require(:todo_like).permit(:task_list_id)
    end
end
