require 'test_helper'

class ImagesCotrollerTest < ActionDispatch::IntegrationTest
  def test_new
    get new_image_path

    assert_response :ok
    assert_select 'h1', text: "Let's submit an image url!"
  end

  def test_show
    Image.create!(link: 'https://www.google.com')
    get image_path(Image.last)

    assert_response :ok
    assert_select 'img[src="https://www.google.com"]', 1
  end
end
