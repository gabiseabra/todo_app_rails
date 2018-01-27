class CreateTodoTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :todo_tasks do |t|
      t.references :task_list, foreign_key: true
      t.integer :position
      t.boolean :checked
      t.text :body

      t.timestamps
    end

    add_index :todo_tasks, :checked
  end
end
