class AddPublicFieldToTodoTaskLists < ActiveRecord::Migration[5.1]
  def change
    change_table :todo_task_lists do |t|
      t.boolean :public, default: true
    end

    add_index :todo_task_lists, :public
  end
end
