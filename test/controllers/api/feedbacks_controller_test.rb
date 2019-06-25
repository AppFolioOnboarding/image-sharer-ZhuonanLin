require 'test_helper'

class FeedbacksControllerTest < ActionDispatch::IntegrationTest
  def test_create__success
    feedback_params = { name: 'name', comment: 'comment' }

    assert_difference 'Feedback.count', 1 do
      post api_feedbacks_path, params: { feedback: feedback_params }
    end
    feedback = Feedback.last

    assert_response :created
    assert_equal feedback_params[:name], feedback.name
    assert_equal feedback_params[:comment], feedback.comment
    assert_equal '{"message":"Successfully create the feedback!"}', @response.body
  end

  def test_create__failure
    assert_no_difference 'Feedback.count' do
      post api_feedbacks_path, params: { feedback: { name: '', comment: '' } }
    end

    assert_response :unprocessable_entity
    assert_equal '{"message":"Feeadback creation failed!"}', @response.body
  end
end
