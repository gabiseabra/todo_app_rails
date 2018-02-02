class CreateTodoLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :todo_likes do |t|
      t.references :user, foreign_key: true
      t.references :task_list, foreign_key: true

      t.timestamps
    end

    add_index :todo_likes, %i[user_id task_list_id], unique: true
  end
end
