class Todo::UsersController < ApplicationController
  before_action :set_todo_user, only: [:show, :edit, :update, :destroy]

  # GET /todo/users
  # GET /todo/users.json
  def index
    @todo_users = Todo::User.all
  end

  # GET /todo/users/1
  # GET /todo/users/1.json
  def show
  end

  # GET /todo/users/new
  def new
    @todo_user = Todo::User.new
  end

  # GET /todo/users/1/edit
  def edit
  end

  # POST /todo/users
  # POST /todo/users.json
  def create
    @todo_user = Todo::User.new(todo_user_params)

    respond_to do |format|
      if @todo_user.save
        format.html { redirect_to @todo_user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @todo_user }
      else
        format.html { render :new }
        format.json { render json: @todo_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /todo/users/1
  # PATCH/PUT /todo/users/1.json
  def update
    respond_to do |format|
      if @todo_user.update(todo_user_params)
        format.html { redirect_to @todo_user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @todo_user }
      else
        format.html { render :edit }
        format.json { render json: @todo_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /todo/users/1
  # DELETE /todo/users/1.json
  def destroy
    @todo_user.destroy
    respond_to do |format|
      format.html { redirect_to todo_users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
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
