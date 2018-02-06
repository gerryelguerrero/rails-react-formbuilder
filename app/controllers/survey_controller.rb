class SurveyController < ApplicationController
    def show
        @survey = Survey.where(slug: params[:slug]).first
    end
end