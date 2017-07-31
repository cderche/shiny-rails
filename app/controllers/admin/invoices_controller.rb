class Admin::InvoicesController < Admin::AdminController

  before_action :set_invoice, only: [:show, :edit, :update, :destroy, :charge]

  def charge
    respond_to do |format|
      format.html { redirect_to admin_invoices_path, notice: 'Invoice was successfully charged.' }
    end
  end

  def index
    @invoices = Invoice.all
  end

  def edit
    redirect_to admin_invoices_path if @invoice.status == :charged
    @readonly = false
  end

  def new
    @invoice = Invoice.new
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
end
