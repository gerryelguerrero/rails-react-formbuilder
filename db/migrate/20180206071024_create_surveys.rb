class CreateSurveys < ActiveRecord::Migration[5.0]
  def change
    create_table :surveys do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :slug, null: false
      t.json :data, null: false      

      t.timestamps
    end

    add_index :surveys, :slug, unique: true
  end
end
