class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.boolean :completed, default: false
      t.integer :priority, default: 0  # 0: low, 1: medium, 2: high
      t.datetime :due_date

      t.timestamps
    end

    add_index :tasks, :completed
    add_index :tasks, :priority
    add_index :tasks, :due_date
  end
end
