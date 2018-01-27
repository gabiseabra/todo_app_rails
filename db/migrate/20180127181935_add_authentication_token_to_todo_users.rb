class AddAuthenticationTokenToTodoUsers < ActiveRecord::Migration[5.1]
  def change
    change_table :todo_users do |t|
      ## Required
      t.string :authentication_token
    end

    add_index :todo_users, :authentication_token, unique: true
  end
end
