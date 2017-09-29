class Admin::UsersController < Admin::AdminController

  before_action :set_user, only: [:show, :edit, :update, :destroy, :add_card, :remove_card]

  def remove_card

    respond_to do |format|
      if PaytureCardService.remove_card(@user, params[:card_id])
        format.html { redirect_to [:admin, @user], notice: 'User card was successfully removed.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { redirect_to [:admin, @user], notice: 'User card was not removed.' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def add_card
    @url = AddCardService.add_card_to_user(@user)
    respond_to do |format|
      format.js
    end
  end

  def index
    @users = User.all
  end

  def show
    @readonly = true
  end

  def edit
    @readonly = false
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to [:admin, @user], notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to admin_users_path, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:firstname, :lastname, :email, :phone, :payture_token)
    end

end
