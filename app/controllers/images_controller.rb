class ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)
    if @image.save
      flash[:notice] = 'Image has been successfully uploaded.'
      redirect_to image_path(@image)
    else
      flash[:notice] = 'Your input image URL is illegal!'
      render new_image_path, status: :unprocessable_entity
    end
  end

  def new
    @image = Image.new
  end

  def show
    @image = Image.find(params[:id])
  end

  def index
    @images = if params[:tag]
                Image.tagged_with(params[:tag])
              else
                Image.all
              end
    @images = @images.order(created_at: :desc)
    flash.now[:notice] = 'You are manually filtering by a nonexistent tag!' if @images.empty?
  end

  private

  def image_params
    params.require(:image).permit(:link, :tag_list)
  end
end
