class CreateConversationsUsersJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :conversations, :users do |t|
      t.index :conversation_id
      t.index :user_id
    end
  end
end
