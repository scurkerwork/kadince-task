require "test_helper"

class TaskTest < ActiveSupport::TestCase
  def setup
    @task = Task.new(title: "Test Task", description: "Test Description", priority: :medium)
  end

  test "should be valid" do
    assert @task.valid?
  end

  test "title should be present" do
    @task.title = "   "
    assert_not @task.valid?
  end

  test "priority should be valid enum" do
    assert_raises(ArgumentError) do
      @task.priority = :invalid_priority
    end
  end

  test "default completed status should be false" do
    task = Task.new(title: "New Task")
    assert_not task.completed?
  end

  test "toggle_completed! should toggle status" do
    @task.save
    assert_not @task.completed?
    
    @task.toggle_completed!
    assert @task.completed?
    
    @task.toggle_completed!
    assert_not @task.completed?
  end

  test "overdue? should return correct boolean" do
    @task.due_date = 1.day.ago
    @task.save
    assert @task.overdue?

    @task.toggle_completed!
    assert_not @task.overdue?

    @task.completed = false
    @task.due_date = 1.day.from_now
    assert_not @task.overdue?
  end
end
