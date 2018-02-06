class BuilderController < ApplicationController

    def create
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