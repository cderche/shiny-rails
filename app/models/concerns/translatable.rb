module Translatable
  extend ActiveSupport::Concern

  def t_name
    I18n.t self.name
  end

end
