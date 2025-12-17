class Task < ApplicationRecord
  # Enums
  enum priority: { low: 0, medium: 1, high: 2 }

  # Validations
  validates :title, presence: true
  validates :priority, inclusion: { in: priorities.keys }

  # Scopes
  scope :pending, -> { where(completed: false) }
  scope :completed, -> { where(completed: true) }
  scope :by_priority, -> { order(priority: :desc) }
  scope :by_due_date, -> { order(due_date: :asc) }
  scope :by_created_at, -> { order(created_at: :desc) }

  # Instance methods
  def toggle_completed!
    update!(completed: !completed)
  end

  def overdue?
    due_date.present? && due_date < Time.current && !completed
  end
end
