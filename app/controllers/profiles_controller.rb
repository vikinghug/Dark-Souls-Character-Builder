class ProfilesController < ApplicationController
  def new
    @profile = Profile.new
  end

  def create
    @profile = Profile.new params[:profile]
    if @profile.save
      redirect_to :action => :index
    else
      render :new
    end
  end

  def index
    @profiles = Profile.all
  end
  
  def show
    @profile = Profile.find params[:id]
  end
end
