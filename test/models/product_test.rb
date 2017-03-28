require 'test_helper'

class ProductTest < ActiveSupport::TestCase
    setup do
        @en_attributes = {
            name: 'Ironing',
            description: 'Ironing takes time',
            price: 9.99,
            quantity_based: true
        }
        @de_attributes = {
            name: 'Bügeln',
            description: 'Bügeln braucht Zeit',
            price: 9.99,
            locale: :de,
            quantity_based: true
        }
    end

    # VALIDATIONS
    test "product attributes must not be empty" do
      product = Product.new
      assert product.invalid?
      assert product.errors[:name].any?
      assert product.errors[:description].any?
      assert product.errors[:price].any?
    end

    test "product price must be positive" do
      product = Product.new(@en_attributes)
      assert product.valid?

      product.price = -1
      assert product.invalid?
      assert_equal [I18n.translate('errors.messages.greater_than_or_equal_to', count: 0.01)], product.errors[:price]

      product.price = 0
      assert product.invalid?
      assert_equal [I18n.translate('errors.messages.greater_than_or_equal_to', count: 0.01)], product.errors[:price]
    end

    test "product is not valid without a unique name" do
      product = Product.new(name: products(:window).name, description: @en_attributes[:description], price: @en_attributes[:price])
      assert product.invalid?
      assert_equal [I18n.translate('errors.messages.taken')], product.errors[:name]
    end

    # Test Translations
    test 'has many translations' do
        assert_has_many(Product, :translations)
    end

    test 'has no translations when first instantiated' do
        assert_equal [], Product.new.translations
    end

    test 'saves attribute in given local if locale is passed in' do
        product = Product.create(@de_attributes)
        assert_translated product, :de, :name, @de_attributes[:name]
    end

    # ATTRIBUTES
    test 'uses given locale if locale passed in' do
        product = Product.create(@en_attributes)
        product.attributes = @de_attributes
        product.save
        product.reload

        assert_equal 2, product.translations.size
        assert_translated product, :de, :name, @de_attributes[:name]
        assert_translated product, :en, :name, @en_attributes[:name]
        assert_translated product, :de, :description, @de_attributes[:description]
        assert_translated product, :en, :description, @en_attributes[:description]
    end

    # UPDATE ATTRIBUTES
    test 'saves translations record for locale passed in' do
        product = Product.create(@de_attributes)
        product.update_attributes(@en_attributes)

        assert_equal 2, product.translations.size
        assert_translated product, :de, :name, @de_attributes[:name]
        assert_translated product, :en, :name, @en_attributes[:name]
        assert_translated product, :de, :description, @de_attributes[:description]
        assert_translated product, :en, :description, @en_attributes[:description]
    end

    test 'saves translations record for current I18n locale if none is passed in' do
        product = with_locale(:de) { Product.create(name: @de_attributes[:name], description: @de_attributes[:description]) }
        with_locale(:en) { product.update_attributes(name: @en_attributes[:name], description: @en_attributes[:description]) }

        assert_equal 2, product.translations.size
        assert_translated product, :de, :name, @de_attributes[:name]
        assert_translated product, :en, :name, @en_attributes[:name]
        assert_translated product, :de, :description, @de_attributes[:description]
        assert_translated product, :en, :description, @en_attributes[:description]
    end

    # RELOAD
    test 'works with translated attributes' do
        product = Product.create(@en_attributes)
        product.name = @de_attributes[:name]
        product.reload
        assert_equal @en_attributes[:name], product.name
    end

    test 'works with translated attributes when updated elsewhere' do
        product = Product.create(@en_attributes)
        product.name # make sure its fetched from the DB

        Product.find_by_id(product.id).update_attributes! name: @de_attributes[:name]

        product.reload

        assert_equal @de_attributes[:name], product.name
    end

    test 'accepts standard finder options' do
        product = Product.create(@en_attributes)
        assert product.reload(readonly: true, lock: true)
    end

    # DESTROY
    test 'destroys dependent translations' do
        product = Product.new(@en_attributes)
        assert_difference 'ProductTranslation.count', 2 do
            product.save
            product.update_attributes(@de_attributes)
        end
        assert_difference 'ProductTranslation.count', -2 do
            product.destroy
        end
    end

    test "can't delete product in cart" do
      product = products(:window)
      assert_difference 'Product.count', 0 do
        product.destroy
      end
    end
end
