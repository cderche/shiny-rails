# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170123181706) do

  create_table "addons", force: :cascade do |t|
    t.integer  "booking_id"
    t.integer  "extra_id"
    t.integer  "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["booking_id"], name: "index_addons_on_booking_id"
    t.index ["extra_id"], name: "index_addons_on_extra_id"
  end

  create_table "addresses", force: :cascade do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "city"
    t.string   "postcode"
    t.string   "phone"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "cart_id"
    t.integer  "user_id"
    t.string   "email"
    t.string   "gateway_token"
    t.string   "street"
    t.string   "block"
    t.string   "house"
    t.string   "building"
    t.string   "apartment"
    t.string   "notes"
    t.string   "token"
    t.boolean  "terms",         default: false
    t.integer  "booking_id"
    t.index ["booking_id"], name: "index_addresses_on_booking_id"
    t.index ["cart_id"], name: "index_addresses_on_cart_id"
    t.index ["user_id"], name: "index_addresses_on_user_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.integer  "service_id"
    t.integer  "user_id"
    t.string   "service_date"
    t.integer  "frequency_id"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.text     "notes"
    t.string   "service_time"
    t.string   "promo_code"
    t.string   "order_token"
    t.decimal  "subtotal"
    t.decimal  "discount"
    t.decimal  "final_total"
    t.boolean  "booking_received_email", default: false
    t.integer  "address_id"
    t.string   "card_token"
    t.datetime "received_sent_at"
    t.integer  "professional_id"
    t.boolean  "closed",                 default: false
    t.datetime "confirmation_sent_at"
    t.index ["address_id"], name: "index_bookings_on_address_id"
    t.index ["frequency_id"], name: "index_bookings_on_frequency_id"
    t.index ["professional_id"], name: "index_bookings_on_professional_id"
    t.index ["service_id"], name: "index_bookings_on_service_id"
    t.index ["user_id"], name: "index_bookings_on_user_id"
  end

  create_table "extras", force: :cascade do |t|
    t.string   "name"
    t.decimal  "price"
    t.boolean  "quantity_based"
    t.integer  "quantity_min"
    t.integer  "quantity_max"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "frequencies", force: :cascade do |t|
    t.string   "name"
    t.decimal  "percent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "order_id"
    t.string   "category"
    t.string   "data"
    t.index ["order_id"], name: "index_notifications_on_order_id"
  end

  create_table "professionals", force: :cascade do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "promos", force: :cascade do |t|
    t.string   "code"
    t.integer  "discount"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "services", force: :cascade do |t|
    t.string   "name"
    t.decimal  "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "payture_token"
    t.string   "firstname"
    t.string   "lastname"
    t.boolean  "terms"
    t.string   "phone"
    t.boolean  "admin",                  default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
