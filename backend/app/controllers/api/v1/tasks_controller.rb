class Api::V1::TasksController < ApplicationController
  wrap_parameters :task, include: [:title, :description, :priority, :due_date, :completed]
  before_action :set_task, only: [:show, :update, :destroy, :toggle]

  # GET /api/v1/tasks
  def index
    @tasks = Task.all

    # Apply filters
    @tasks = filter_by_status(@tasks, params[:status]) if params[:status].present?
    @tasks = filter_by_priority(@tasks, params[:priority]) if params[:priority].present?

    # Apply sorting
    @tasks = apply_sorting(@tasks, params[:sort], params[:order])

    render json: @tasks
  end

  # GET /api/v1/tasks/:id
  def show
    render json: @task
  end

  # POST /api/v1/tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/tasks/:id
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/tasks/:id
  def destroy
    @task.destroy
    head :no_content
  end

  # PATCH /api/v1/tasks/:id/toggle
  def toggle
    @task.toggle_completed!
    render json: @task
  end

  private

  def set_task
    @task = Task.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Task not found' }, status: :not_found
  end

  def task_params
    params.require(:task).permit(:title, :description, :priority, :due_date, :completed)
  end

  def filter_by_status(tasks, status)
    case status.downcase
    when 'pending'
      tasks.pending
    when 'completed'
      tasks.completed
    when 'all'
      tasks
    else
      tasks
    end
  end

  def filter_by_priority(tasks, priority)
    return tasks unless Task.priorities.key?(priority.downcase)
    tasks.where(priority: Task.priorities[priority.downcase])
  end

  def apply_sorting(tasks, sort_field, order)
    sort_field ||= 'created_at'
    order ||= 'desc'

    case sort_field.downcase
    when 'priority'
      tasks.by_priority
    when 'due_date'
      order == 'asc' ? tasks.by_due_date : tasks.order(due_date: :desc)
    when 'created_at'
      order == 'asc' ? tasks.order(created_at: :asc) : tasks.by_created_at
    else
      tasks.by_created_at
    end
  end
end
