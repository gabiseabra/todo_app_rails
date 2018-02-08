class AddParentToTodoTasks < ActiveRecord::Migration[5.1]
  def change
    change_table :todo_tasks do |t|
      t.references :task, foreign_key: true, null: true
    end
  end
end
