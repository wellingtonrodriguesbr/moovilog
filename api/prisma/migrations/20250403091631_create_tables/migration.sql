-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('MICRO', 'SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "VehicleCategory" AS ENUM ('UTILITY', 'VAN', 'LIGHT_TRUCKS', 'STRAIGHT_TRUCKS', 'TRUCKS', 'QUAD_AXLE_TRUCKS', 'SEMI_TRAILER', 'B_TRAIN', 'ROAD_TRAIN');

-- CreateEnum
CREATE TYPE "VehicleBody" AS ENUM ('CLOSED', 'OPEN', 'SIDER', 'REFRIGERATED', 'BUCKET', 'TANK', 'BULK_CARRIER', 'LIVESTOCK', 'FLATBED', 'CONTAINER', 'WOOD', 'CAR_CARRIER');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('OWN', 'AGGREGATE', 'RENTED');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'INACTIVE', 'RESERVED', 'BROKEN');

-- CreateEnum
CREATE TYPE "FreightType" AS ENUM ('FRACTIONAL', 'DEDICATED', 'EXPRESS', 'TRANSFER');

-- CreateEnum
CREATE TYPE "FreightModality" AS ENUM ('DAILY', 'PERCENTAGE', 'PRODUCTIVITY', 'FLAT_RATE', 'WEIGHT_BASED', 'DISTANCE_BASED', 'TIME_BASED', 'PER_STOP', 'ZONE_BASED');

-- CreateEnum
CREATE TYPE "PickupStatus" AS ENUM ('PENDING', 'IN_ROUTE', 'COLLECTED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PickupPriority" AS ENUM ('NORMAL', 'URGENT');

-- CreateEnum
CREATE TYPE "NonPickupReason" AS ENUM ('CUSTOMER_ABSENT', 'WRONG_ADDRESS', 'ACCESS_RESTRICTED', 'REFUSED_BY_CUSTOMER', 'WEATHER_CONDITIONS', 'OTHER');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "DriverType" AS ENUM ('INTERNAL', 'FREELANCER', 'AGGREGATE');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('PASSWORD_RECOVER', 'AUTH_LINK');

-- CreateEnum
CREATE TYPE "FinanceTransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "FinanceTransactionStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'PIX', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "phone" TEXT,
    "extra_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document_number" TEXT NOT NULL,
    "size" "CompanySize" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "owner_id" TEXT NOT NULL,
    "address_id" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_members" (
    "id" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "status" "AccountStatus" NOT NULL DEFAULT 'PENDING',
    "extraData" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "company_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document_number" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "type" "DriverType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "creator_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "address_id" TEXT,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "trailer_plate" TEXT,
    "year" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "status" "VehicleStatus" NOT NULL DEFAULT 'ACTIVE',
    "category" "VehicleCategory" NOT NULL,
    "type" "VehicleType" NOT NULL,
    "body" "VehicleBody" NOT NULL,
    "full_load_capacity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "company_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freights" (
    "id" TEXT NOT NULL,
    "type" "FreightType" NOT NULL,
    "modality" "FreightModality" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "pickups_quantity" INTEGER,
    "deliveries_quantity" INTEGER NOT NULL,
    "total_weight_of_pickups" DECIMAL(10,2),
    "total_weight_of_deliveries" DECIMAL(10,2) NOT NULL,
    "freight_amount_in_cents" INTEGER NOT NULL,
    "observation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "driver_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "creator_id" TEXT,
    "company_id" TEXT NOT NULL,
    "route_id" TEXT,

    CONSTRAINT "freights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pickups" (
    "id" TEXT NOT NULL,
    "pickup_number" TEXT NOT NULL,
    "sender_name" TEXT NOT NULL,
    "recipient_name" TEXT NOT NULL,
    "weight" DECIMAL(10,2) NOT NULL,
    "volume_quantity" INTEGER NOT NULL,
    "cubage" DECIMAL(10,2),
    "status" "PickupStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "PickupPriority" NOT NULL DEFAULT 'NORMAL',
    "observation" TEXT,
    "non_pickup_reason" "NonPickupReason",
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduled_date" TIMESTAMP(3) NOT NULL,
    "collected_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_at" TIMESTAMP(3) NOT NULL,
    "freight_id" TEXT,
    "company_id" TEXT NOT NULL,
    "creator_id" TEXT,
    "assigned_driver_id" TEXT,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "pickups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pickup_histories" (
    "id" TEXT NOT NULL,
    "status" "PickupStatus" NOT NULL,
    "non_pickup_reason" "NonPickupReason",
    "attempt_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observation" TEXT,
    "pickup_id" TEXT NOT NULL,
    "driver_id" TEXT,

    CONSTRAINT "pickup_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "routes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "creator_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities_in_route" (
    "id" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,

    CONSTRAINT "cities_in_route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "acronym" TEXT NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city_id" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance_transactions" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "amount_in_cents" INTEGER NOT NULL,
    "due_date" TIMESTAMP(3),
    "type" "FinanceTransactionType" NOT NULL,
    "status" "FinanceTransactionStatus" NOT NULL,
    "payment_method" "PaymentMethod",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "creator_id" TEXT,

    CONSTRAINT "finance_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver_transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "driver_id" TEXT NOT NULL,
    "finance_transaction_id" TEXT NOT NULL,

    CONSTRAINT "driver_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "freight_transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "freight_id" TEXT NOT NULL,
    "finance_transaction_id" TEXT NOT NULL,

    CONSTRAINT "freight_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pickup_transactions" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "pickup_id" TEXT NOT NULL,
    "finance_transaction_id" TEXT NOT NULL,

    CONSTRAINT "pickup_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finance_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "companies_document_number_key" ON "companies"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "companies_owner_id_key" ON "companies"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_address_id_key" ON "companies"("address_id");

-- CreateIndex
CREATE INDEX "company_members_status_idx" ON "company_members"("status");

-- CreateIndex
CREATE INDEX "company_members_sector_idx" ON "company_members"("sector");

-- CreateIndex
CREATE INDEX "company_members_user_id_idx" ON "company_members"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "company_members_company_id_user_id_key" ON "company_members"("company_id", "user_id");

-- CreateIndex
CREATE INDEX "drivers_name_idx" ON "drivers"("name");

-- CreateIndex
CREATE INDEX "drivers_type_idx" ON "drivers"("type");

-- CreateIndex
CREATE INDEX "drivers_status_idx" ON "drivers"("status");

-- CreateIndex
CREATE INDEX "drivers_created_at_idx" ON "drivers"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_document_number_company_id_key" ON "drivers"("document_number", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_phone_company_id_key" ON "drivers"("phone", "company_id");

-- CreateIndex
CREATE INDEX "vehicles_year_idx" ON "vehicles"("year");

-- CreateIndex
CREATE INDEX "vehicles_brand_idx" ON "vehicles"("brand");

-- CreateIndex
CREATE INDEX "vehicles_model_idx" ON "vehicles"("model");

-- CreateIndex
CREATE INDEX "vehicles_status_idx" ON "vehicles"("status");

-- CreateIndex
CREATE INDEX "vehicles_category_idx" ON "vehicles"("category");

-- CreateIndex
CREATE INDEX "vehicles_type_idx" ON "vehicles"("type");

-- CreateIndex
CREATE INDEX "vehicles_body_idx" ON "vehicles"("body");

-- CreateIndex
CREATE INDEX "vehicles_created_at_idx" ON "vehicles"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_plate_company_id_key" ON "vehicles"("plate", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_trailer_plate_company_id_key" ON "vehicles"("trailer_plate", "company_id");

-- CreateIndex
CREATE INDEX "freights_date_idx" ON "freights"("date");

-- CreateIndex
CREATE INDEX "freights_type_idx" ON "freights"("type");

-- CreateIndex
CREATE INDEX "freights_modality_idx" ON "freights"("modality");

-- CreateIndex
CREATE INDEX "freights_driver_id_idx" ON "freights"("driver_id");

-- CreateIndex
CREATE INDEX "freights_vehicle_id_idx" ON "freights"("vehicle_id");

-- CreateIndex
CREATE INDEX "freights_creator_id_idx" ON "freights"("creator_id");

-- CreateIndex
CREATE INDEX "freights_company_id_idx" ON "freights"("company_id");

-- CreateIndex
CREATE INDEX "freights_route_id_idx" ON "freights"("route_id");

-- CreateIndex
CREATE UNIQUE INDEX "pickups_pickup_number_key" ON "pickups"("pickup_number");

-- CreateIndex
CREATE INDEX "pickups_pickup_number_idx" ON "pickups"("pickup_number");

-- CreateIndex
CREATE INDEX "pickups_status_idx" ON "pickups"("status");

-- CreateIndex
CREATE INDEX "pickups_sender_name_idx" ON "pickups"("sender_name");

-- CreateIndex
CREATE INDEX "pickups_recipient_name_idx" ON "pickups"("recipient_name");

-- CreateIndex
CREATE INDEX "pickups_scheduled_date_idx" ON "pickups"("scheduled_date");

-- CreateIndex
CREATE INDEX "pickups_collected_at_idx" ON "pickups"("collected_at");

-- CreateIndex
CREATE INDEX "pickups_freight_id_idx" ON "pickups"("freight_id");

-- CreateIndex
CREATE INDEX "pickups_company_id_idx" ON "pickups"("company_id");

-- CreateIndex
CREATE INDEX "pickups_creator_id_idx" ON "pickups"("creator_id");

-- CreateIndex
CREATE INDEX "pickups_assigned_driver_id_idx" ON "pickups"("assigned_driver_id");

-- CreateIndex
CREATE INDEX "pickups_requested_at_idx" ON "pickups"("requested_at");

-- CreateIndex
CREATE INDEX "pickups_priority_idx" ON "pickups"("priority");

-- CreateIndex
CREATE INDEX "pickup_histories_pickup_id_idx" ON "pickup_histories"("pickup_id");

-- CreateIndex
CREATE INDEX "pickup_histories_driver_id_idx" ON "pickup_histories"("driver_id");

-- CreateIndex
CREATE INDEX "pickup_histories_attempt_date_idx" ON "pickup_histories"("attempt_date");

-- CreateIndex
CREATE INDEX "routes_name_idx" ON "routes"("name");

-- CreateIndex
CREATE INDEX "routes_company_id_idx" ON "routes"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "states_acronym_key" ON "states"("acronym");

-- CreateIndex
CREATE INDEX "cities_name_idx" ON "cities"("name");

-- CreateIndex
CREATE INDEX "cities_state_id_idx" ON "cities"("state_id");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_state_id_key" ON "cities"("name", "state_id");

-- CreateIndex
CREATE UNIQUE INDEX "token_code_key" ON "token"("code");

-- CreateIndex
CREATE INDEX "finance_transactions_due_date_idx" ON "finance_transactions"("due_date");

-- CreateIndex
CREATE INDEX "finance_transactions_type_idx" ON "finance_transactions"("type");

-- CreateIndex
CREATE INDEX "finance_transactions_status_idx" ON "finance_transactions"("status");

-- CreateIndex
CREATE INDEX "finance_transactions_category_id_idx" ON "finance_transactions"("category_id");

-- CreateIndex
CREATE INDEX "finance_transactions_company_id_idx" ON "finance_transactions"("company_id");

-- CreateIndex
CREATE INDEX "finance_transactions_creator_id_idx" ON "finance_transactions"("creator_id");

-- CreateIndex
CREATE INDEX "finance_transactions_payment_method_idx" ON "finance_transactions"("payment_method");

-- CreateIndex
CREATE UNIQUE INDEX "finance_categories_name_key" ON "finance_categories"("name");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "company_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "company_members"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "company_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "freights"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "company_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_assigned_driver_id_fkey" FOREIGN KEY ("assigned_driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickups" ADD CONSTRAINT "pickups_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_histories" ADD CONSTRAINT "pickup_histories_pickup_id_fkey" FOREIGN KEY ("pickup_id") REFERENCES "pickups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_histories" ADD CONSTRAINT "pickup_histories_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "company_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routes" ADD CONSTRAINT "routes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities_in_route" ADD CONSTRAINT "cities_in_route_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities_in_route" ADD CONSTRAINT "cities_in_route_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance_transactions" ADD CONSTRAINT "finance_transactions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "finance_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance_transactions" ADD CONSTRAINT "finance_transactions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance_transactions" ADD CONSTRAINT "finance_transactions_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "company_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_transactions" ADD CONSTRAINT "driver_transactions_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver_transactions" ADD CONSTRAINT "driver_transactions_finance_transaction_id_fkey" FOREIGN KEY ("finance_transaction_id") REFERENCES "finance_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight_transactions" ADD CONSTRAINT "freight_transactions_freight_id_fkey" FOREIGN KEY ("freight_id") REFERENCES "freights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "freight_transactions" ADD CONSTRAINT "freight_transactions_finance_transaction_id_fkey" FOREIGN KEY ("finance_transaction_id") REFERENCES "finance_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_transactions" ADD CONSTRAINT "pickup_transactions_pickup_id_fkey" FOREIGN KEY ("pickup_id") REFERENCES "pickups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pickup_transactions" ADD CONSTRAINT "pickup_transactions_finance_transaction_id_fkey" FOREIGN KEY ("finance_transaction_id") REFERENCES "finance_transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
