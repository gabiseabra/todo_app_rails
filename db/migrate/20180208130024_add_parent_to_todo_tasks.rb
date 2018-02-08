class AddParentToTodoTasks < ActiveRecord::Migration[5.1]
  def change
    change_table :todo_tasks do |t|
      t.references :task, foreign_key: { to_table: :todo_tasks }, null: true
    end
  end
end
