class Admin::InvoicesController < Admin::AdminController

  before_action :set_invoice, only: [:show, :edit, :update, :destroy, :charge]
  before_action :set_booking, only: [:new]

  def charge
    respond_to do |format|
      if PaytureWalletService.charge(@invoice)
        format.html { redirect_to admin_invoices_path, notice: 'Invoice was charged.' }
      else
        format.html { redirect_to admin_invoices_path, notice: 'Invoice was not charged.' }
      end
    end
  end

  def index
    @page = params[:page] || 0
    @prev = Invoice.page(@page).prev_page
    @next = Invoice.page(@page).next_page

    @invoices = Invoice.order(updated_at: :desc).page @page

    @charges_daily    = []
    @charges_weekly   = []
    @charges_monthly  = []
    @charges_yearly   = []

    7.times do |i|
      day    = Date.today - i.days
      sWeek   = Date.today.beginning_of_week  - i.week
      eWeek   = Date.today.end_of_week        - i.week
      sMonth  = Date.today.beginning_of_month - i.month
      eMonth  = Date.today.end_of_month       - i.month
      sYear   = Date.today.beginning_of_year  - i.year
      eYear   = Date.today.end_of_year        - i.year
      @charges_daily    << Invoice.charged.where(date: day).sum(:amount).to_f
      @charges_weekly   << Invoice.charged_between(sWeek  , eWeek).sum(:amount).to_f
      @charges_monthly  << Invoice.charged_between(sMonth , eMonth).sum(:amount).to_f
      @charges_yearly   << Invoice.charged_between(sYear  , eYear).sum(:amount).to_f
    end
  end

  def edit
    redirect_to admin_invoices_path if @invoice.status == :charged
    @readonly = false
  end

  def new
    @readonly = false
  end

  def show
    @readonly = true
  end

  def create
    @invoice = Invoice.new(invoice_params)

    respond_to do |format|
      if @invoice.save
        format.html { redirect_to admin_invoices_path, notice: 'Invoice was successfully created.' }
        format.json { render :show, status: :created, location: @invoice }
      else
        format.html { render :new }
        format.json { render json: @invoice.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @invoice.update(invoice_params)
        format.html { redirect_to admin_invoices_path, notice: 'Invoice was successfully updated.' }
        format.json { render :show, status: :ok, location: @invoice }
      else
        format.html { render :edit }
        format.json { render json: @invoice.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @invoice.destroy
    respond_to do |format|
      format.html { redirect_to admin_invoices_path, notice: 'Invoice was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_invoice
      @invoice = Invoice.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def invoice_params
      params.require(:invoice).permit(:booking_id, :date, :amount)
    end

    def set_booking
      @invoice = Invoice.new
      if params[:booking_id]
        booking = Booking.find(params[:booking_id])
        @invoice.booking = booking
        @invoice.amount = booking.final_total
      end
    end
end
