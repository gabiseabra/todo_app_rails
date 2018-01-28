module ApplicationHelper
  def authentication_tags
    tag.script(@current_todo_user.try(:authentication_token).to_json,
               id: 'authentication-token',
               type: 'application/json') <<
    tag.script(@current_todo_user.to_json,
               id: 'authenticated-user',
               type: 'application/json')
  end
end
