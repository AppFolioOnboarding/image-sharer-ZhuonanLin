require 'test_helper'

class ImagesCotrollerTest < ActionDispatch::IntegrationTest
  def test_create__success
    image_params = { link: 'https://www.google.com' }

    assert_difference 'Image.count' do
      post images_path, params: { image: image_params }
    end

    assert_redirected_to image_path(Image.last)
    follow_redirect!
    assert_select '.alert-success', 'Image has been successfully uploaded.'
  end

  def test_create__failure
    image_params = { link: 'junk' }
    assert_no_difference 'Image.count' do
      post images_path, params: { image: image_params }
    end

    assert_response :unprocessable_entity
    assert_select '.alert-danger', 'Your input image URL is illegal!'
  end

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
