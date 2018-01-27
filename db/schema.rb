# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180127020553) do

  create_table "todo_task_lists", force: :cascade do |t|
    t.integer "user_id"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_todo_task_lists_on_user_id"
  end

  create_table "todo_tasks", force: :cascade do |t|
    t.integer "task_list_id"
    t.integer "position"
    t.boolean "checked"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["checked"], name: "index_todo_tasks_on_checked"
    t.index ["task_list_id"], name: "index_todo_tasks_on_task_list_id"
  end

  create_table "todo_users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_todo_users_on_email", unique: true
    t.index ["username"], name: "index_todo_users_on_username", unique: true
  end

end
