require 'test_helper'

class ImagesCotrollerTest < ActionDispatch::IntegrationTest
  def test_create__success
    image_params = { link: 'https://www.google.com', tag_list: 'google' }

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
    tag_lists = %w[google search]
    Image.create!(link: 'https://www.google.com', tag_list: tag_lists)
    get image_path(Image.last)

    assert_response :ok
    assert_select 'img[src="https://www.google.com"]', 1
    assert_select 'li' do |lis|
      lis.each_with_index do |li, idx|
        assert_equal li.children.text, tag_lists[idx]
      end
    end
  end

  def test_index
    Image.create!(link: 'https://www.google.com')

    get images_path

    assert_response :ok
    assert_select 'img[src="https://www.google.com"]', 1
  end

  def test_index__most_recent_show_first
    links = ['https://www.google.com', 'https://www.facebook.com']
    links.each do |link|
      Image.create!(link: link)
    end
    links.reverse!

    get images_path

    assert_response :ok
    assert_select 'img' do |images|
      images.each_with_index do |image, idx|
        assert_equal image.attribute('class').value, 'image-max-width'
        assert_equal image.attribute('src').value, links[idx]
      end
    end
  end
end
