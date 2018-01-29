module ApplicationHelper
  def authentication_tags
    tag.script(@current_todo_user.try(:authentication_token).to_json.html_safe,
               id: 'authentication-token',
               type: 'application/json').html_safe <<
    tag.script(@current_todo_user.to_json.html_safe,
               id: 'authenticated-user',
               type: 'application/json')
  end
end
