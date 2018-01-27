require "rails_helper"

RSpec.describe Todo::TasksController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/todo/tasks").to route_to("todo/tasks#index")
    end

    it "routes to #new" do
      expect(:get => "/todo/tasks/new").to route_to("todo/tasks#new")
    end

    it "routes to #show" do
      expect(:get => "/todo/tasks/1").to route_to("todo/tasks#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/todo/tasks/1/edit").to route_to("todo/tasks#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/todo/tasks").to route_to("todo/tasks#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/todo/tasks/1").to route_to("todo/tasks#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/todo/tasks/1").to route_to("todo/tasks#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/todo/tasks/1").to route_to("todo/tasks#destroy", :id => "1")
    end

  end
end
