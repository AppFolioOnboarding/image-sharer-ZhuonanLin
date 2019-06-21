class Image < ApplicationRecord
  acts_as_taggable

  validate :url_must_be_valid

  def url_must_be_valid
    url = URI.parse(link)
    return if url.is_a?(URI::HTTP) || url.is_a?(URI::HTTPS)
    errors.add(:link, 'must be a valid URL link!')
  end
end
