module Api
  class FeedbacksController < ApplicationController
    def create
      @feedback = Feedback.new(feedback_params)
      if @feedback.save
        render status: :created, json: { message: 'Successfully create the feedback!' }
      else
        render status: :unprocessable_entity, json: { message: 'Feeadback creation failed!' }
      end
    end

    private

    def feedback_params
      params.require(:feedback).permit(:name, :comment)
    end
  end
end
