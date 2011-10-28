class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :name
      t.text :description
      t.text :stats
      t.string :slug

      t.timestamps
    end
  end
end
