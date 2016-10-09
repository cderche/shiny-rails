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

ActiveRecord::Schema.define(version: 20161009170223) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

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
    t.index ["cart_id"], name: "index_addresses_on_cart_id", using: :btree
    t.index ["user_id"], name: "index_addresses_on_user_id", using: :btree
  end

  create_table "admins", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_admins_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true, using: :btree
  end

  create_table "carts", force: :cascade do |t|
    t.string   "frequency"
    t.string   "date"
    t.string   "time"
    t.integer  "duration"
    t.boolean  "ironing"
    t.boolean  "pets"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.datetime "purchased_at"
    t.string   "token"
  end

  create_table "notifications", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "order_id"
    t.string   "category"
    t.hstore   "data"
    t.index ["order_id"], name: "index_notifications_on_order_id", using: :btree
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "notification_id"
    t.integer  "cart_id"
    t.integer  "address_id"
    t.string   "status"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["address_id"], name: "index_orders_on_address_id", using: :btree
    t.index ["cart_id"], name: "index_orders_on_cart_id", using: :btree
    t.index ["notification_id"], name: "index_orders_on_notification_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "notifications", "orders"
end
