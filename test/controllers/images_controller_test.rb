require 'test_helper'

class ImagesCotrollerTest < ActionDispatch::IntegrationTest
  def test_new
    get new_image_path

    assert_response :ok
    assert_select 'h1', text: "Let's submit an image url!"
  end

end
