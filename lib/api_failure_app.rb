class ApiFailureApp < Devise::FailureApp
  def respond
    if http_auth?
      http_auth
    elsif warden_options[:recall]
      recall
    else
      http_auth_head
    end
  end

  def http_auth_head
    self.status = 401
    self.headers['WWW-Authenticate'] = %(Basic realm=#{Devise.http_authentication_realm.inspect}) if http_auth_header?
  end

  def http_auth_body
    return super unless request_format == :json
    { errors: { scope => [i18n_message] } }.to_json
  end
end
