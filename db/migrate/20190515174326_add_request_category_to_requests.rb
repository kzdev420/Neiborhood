class AddRequestCategoryToRequests < ActiveRecord::Migration[5.2]
  def change
    add_reference :requests, :request_category, foreign_key: true, index: true
  end
end
