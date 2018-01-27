require "rails_helper"

RSpec.describe Todo::UsersController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/todo/users").to route_to("todo/users#index")
    end

    it "routes to #new" do
      expect(:get => "/todo/users/new").to route_to("todo/users#new")
    end

    it "routes to #show" do
      expect(:get => "/todo/users/1").to route_to("todo/users#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/todo/users/1/edit").to route_to("todo/users#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/todo/users").to route_to("todo/users#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/todo/users/1").to route_to("todo/users#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/todo/users/1").to route_to("todo/users#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/todo/users/1").to route_to("todo/users#destroy", :id => "1")
    end

  end
end
