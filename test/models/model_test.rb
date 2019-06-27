require 'test_helper'

class FeedbackTest < ActiveSupport::TestCase
  def test_feedback
    feedback = Feedback.new(name: 'name', comment: 'comment')

    assert_predicate feedback, :valid?
  end

  def test_feedback__without_name_or_comment
    feedback_noname = Feedback.new(name: '', comment: 'comment')
    feedback_nocomment = Feedback.new(name: 'name', comment: '')

    assert_not_predicate feedback_noname, :valid?
    assert_not_predicate feedback_nocomment, :valid?
  end
end
