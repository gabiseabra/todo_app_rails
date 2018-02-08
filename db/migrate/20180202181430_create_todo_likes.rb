class CreateTodoLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :todo_likes do |t|
      t.references :user, foreign_key: { to_table: :todo_users }
      t.references :task_list, foreign_key: { to_table: :todo_task_lists }

      t.timestamps
    end

    add_index :todo_likes, %i[user_id task_list_id], unique: true
  end
end
