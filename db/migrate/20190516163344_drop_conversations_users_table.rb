class DropConversationsUsersTable < ActiveRecord::Migration[5.2]
  def up
    drop_join_table :conversations, :users
    remove_reference :conversations, :request, index: true, foreign_key: true
    remove_reference :conversations, :user, index: true, foreign_key: true
  end

  def down
    add_reference :conversations, :user, index: true, foreign_key: true
    add_reference :conversations, :request, index: true, foreign_key: true
    create_join_table :users, :conversations do |t|
      # t.index [:user_id, :conversation_id]
      # t.index [:conversation_id, :user_id]
    end
  end
end
