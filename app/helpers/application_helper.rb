module ApplicationHelper
  def authentication_tags
    user = @current_todo_user
    json = user.to_json(methods: %i[avatar_url])
    token = user.try(:authentication_token).to_json
    tag.script(token.html_safe,
               id: 'authentication-token',
               type: 'application/json') <<
    tag.script(json.html_safe,
               id: 'authenticated-user',
               type: 'application/json')
  end
end
