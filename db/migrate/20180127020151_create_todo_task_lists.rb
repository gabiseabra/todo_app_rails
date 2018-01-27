class CreateTodoTaskLists < ActiveRecord::Migration[5.1]
  def change
    create_table :todo_task_lists do |t|
      t.references :user, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
