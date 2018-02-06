class Survey < ApplicationRecord

    validates :title, presence: true
    validates :slug, presence: true, uniqueness: true

    before_validation :set_default_title, on: :create
    before_validation :set_default_description, on: :create
    before_validation :generate_slug, on: :create
    before_validation :set_initial_state, on :create

    private

    def set_default_title
        self.title = "Untitled form" if title.blank?
    end

    def set_default_description
        self.description = "Enter some description for your form here" if description.blank?
    end

    def generate_slug
        self.slug = loop do
        slug = SecureRandom.base64(12).tr('+/=', 'azyb')
        break slug unless self.class.exists?(slug: slug)
        end
    end

    def set_initial_state
        self.data = {
            error: null,
            schema: {
                type: "object",
                title: self.set_default_title,
                description: self.set_default_description,
                properties: {}
            },
            uiSchema: {
                "ui:order": []
            },
            formData: {},
            currentIndex: 0,
        } if data.blank?
end
