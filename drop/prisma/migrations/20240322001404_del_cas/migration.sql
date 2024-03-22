-- DropForeignKey
ALTER TABLE "cmp_locations" DROP CONSTRAINT "cmp_locations_companyId_fkey";

-- DropForeignKey
ALTER TABLE "cmp_refresh_tokens" DROP CONSTRAINT "cmp_refresh_tokens_companyId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_geoJsonId_fkey";

-- AddForeignKey
ALTER TABLE "cmp_refresh_tokens" ADD CONSTRAINT "cmp_refresh_tokens_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_geoJsonId_fkey" FOREIGN KEY ("geoJsonId") REFERENCES "GeoJson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cmp_locations" ADD CONSTRAINT "cmp_locations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
