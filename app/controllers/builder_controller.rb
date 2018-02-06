class BuilderController < ApplicationController

    def create
        survey = Survey.create
        
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