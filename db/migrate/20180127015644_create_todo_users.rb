class CreateTodoUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :todo_users do |t|
      t.string :username
      t.string :email
      t.string :password

      t.timestamps
    end

    add_index :todo_users, :username, unique: true
    add_index :todo_users, :email, unique: true
  end
end
