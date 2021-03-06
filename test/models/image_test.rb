require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  def test_link_validation__https
    image = Image.new(link: 'https://www.google.com')

    assert_predicate image, :valid?
  end

  def test_link_validation__http
    image = Image.new(link: 'http://www.google.com')

    assert_predicate image, :valid?
  end

  def test_link_validation__invalid_link
    image = Image.new(link: 'asdfas')

    assert_not_predicate image, :valid?
    assert_equal ['must be a valid URL link!'], image.errors.messages[:link]
  end

  def test_link_validation__not_http_link
    image = Image.new(link: 'ftp://192.168.1.1')

    assert_equal false, image.valid?
    assert_equal ['must be a valid URL link!'], image.errors.messages[:link]
  end

  def test_create_image__with_tag
    assert_difference 'Image.count' do
      image = Image.create!(link: 'http://www.google.com', tag_list: 'google')
      assert_equal ['google'], image.tag_list
    end
  end

  def test_create_image__without_tag
    assert_difference 'Image.count' do
      Image.create!(link: 'http://www.google.com')
    end
  end
end
