class CreateReplies < ActiveRecord::Migration[5.2]
  def change
    create_table :replies do |t|
      t.integer :request_id
      t.integer :volunteer_id
      t.boolean :active, default: false
      t.boolean :message_sent, default: false

      t.timestamps
    end
  end
end
