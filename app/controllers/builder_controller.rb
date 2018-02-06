class BuilderController < ApplicationController

    def create
        survey = Survey.create
        redirect_to(edit_builder_path(survey))
    end

    def edit
        @survey = Survey.find(params[:id])
    end

    def update
    end
    
    private

    def builder_params
        params.require(:survey).permit(
            :title,
            :description,
            :data
        )
    end
end