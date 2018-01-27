class RemoveDeviseProviderFieldsFromTodoUsers < ActiveRecord::Migration[5.1]
  def change
    change_table :todo_users do |t|
      t.remove_index column: [:uid, :provider]
      t.remove :provider
      t.remove :uid
    end
  end
end
