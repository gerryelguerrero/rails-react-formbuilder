class BuilderController < ApplicationController

    def create
        survey = Survey.create
        redirect_to(edit_builder_path(survey))
    end

    def edit
        @survey = Survey.find(params[:id])
    end

    def update
        survey = Survey.find(params[:id])
        
        survey.update(survey_params)

        respond_to do |format|
            format.json { render json: survey }
            format.html { redirect_to(edit_builder_path(survey)) }
        end
    end

    def destroy
        survey = Survey.find(params[:id])
        survey.destroy    
    end
    
    private

    def survey_params
        params.require(:survey).permit(:title, :description).tap do |whitelisted|
            whitelisted[:data] = params[:survey].fetch(:data, ActionController::Parameters.new).permit!
        end
    end
end