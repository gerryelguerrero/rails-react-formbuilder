class SurveysController < ApplicationController
    def show
        @survey = Survey.where(slug: params[:slug]).first
    end
end