-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin', 'editor');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Succeeded', 'RequiresPaymentMethod', 'RequiresConfirmation', 'Canceled', 'Processing', 'RequiresAction', 'RequiresCapture', 'Unknown');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "photo" TEXT DEFAULT 'default.png',
    "verified" BOOLEAN DEFAULT false,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "bannerUrl" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "discord" TEXT,
    "password" TEXT NOT NULL,
    "role" "RoleEnumType" DEFAULT 'user',
    "verificationCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "provider" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatorType" (
    "name" TEXT NOT NULL,

    CONSTRAINT "CreatorType_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "CreatorComingSoon" (
    "collectionName" TEXT NOT NULL,
    "creatorHandleName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "launchDate" TIMESTAMP(3),

    CONSTRAINT "CreatorComingSoon_pkey" PRIMARY KEY ("collectionName")
);

-- CreateTable
CREATE TABLE "Creator" (
    "name" TEXT NOT NULL,
    "handleName" TEXT NOT NULL,
    "creatorType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "bannerUrl" TEXT,
    "body" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "discord" TEXT,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Collection" (
    "name" TEXT NOT NULL,
    "creatorHandleName" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT '0x285ca2dc98ed5119',
    "launchDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "categoryName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "videoUrl" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "discord" TEXT,
    "isMinting" BOOLEAN NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "ListedName" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "color" TEXT
);

-- CreateTable
CREATE TABLE "CollectionsList" (
    "name" TEXT NOT NULL,
    "launchDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CollectionsList_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadataId" INTEGER NOT NULL,
    "serial" INTEGER NOT NULL,
    "collectionName" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT '0x5593df7d286bcdb8',
    "creatorHandleName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isListed" BOOLEAN NOT NULL,
    "isMinted" BOOLEAN NOT NULL DEFAULT false,
    "price" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "nFTsListName" TEXT,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTsList" (
    "name" TEXT NOT NULL,

    CONSTRAINT "NFTsList_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "items" TEXT NOT NULL,
    "amount" INTEGER,
    "currency" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "setupIntentId" TEXT,
    "chargeId" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CollectionToCollectionsList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NFTToNFTsList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_verificationCode_key" ON "users"("verificationCode");

-- CreateIndex
CREATE INDEX "users_email_verificationCode_idx" ON "users"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_verificationCode_key" ON "users"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "CreatorType_name_key" ON "CreatorType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CreatorComingSoon_collectionName_key" ON "CreatorComingSoon"("collectionName");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_name_key" ON "Creator"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_handleName_key" ON "Creator"("handleName");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_slug_key" ON "Creator"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_avatarUrl_key" ON "Collection"("avatarUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionsList_name_key" ON "CollectionsList"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NFT_id_name_serial_collectionName_key" ON "NFT"("id", "name", "serial", "collectionName");

-- CreateIndex
CREATE UNIQUE INDEX "NFTsList_name_key" ON "NFTsList"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_setupIntentId_key" ON "Payment"("setupIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_chargeId_key" ON "Payment"("chargeId");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToCollectionsList_AB_unique" ON "_CollectionToCollectionsList"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToCollectionsList_B_index" ON "_CollectionToCollectionsList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NFTToNFTsList_AB_unique" ON "_NFTToNFTsList"("A", "B");

-- CreateIndex
CREATE INDEX "_NFTToNFTsList_B_index" ON "_NFTToNFTsList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "CreatorComingSoon" ADD CONSTRAINT "CreatorComingSoon_creatorHandleName_fkey" FOREIGN KEY ("creatorHandleName") REFERENCES "Creator"("handleName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creator" ADD CONSTRAINT "Creator_creatorType_fkey" FOREIGN KEY ("creatorType") REFERENCES "CreatorType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_creatorHandleName_fkey" FOREIGN KEY ("creatorHandleName") REFERENCES "Creator"("handleName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_collectionName_fkey" FOREIGN KEY ("collectionName") REFERENCES "Collection"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_creatorHandleName_fkey" FOREIGN KEY ("creatorHandleName") REFERENCES "Creator"("handleName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToCollectionsList" ADD CONSTRAINT "_CollectionToCollectionsList_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToCollectionsList" ADD CONSTRAINT "_CollectionToCollectionsList_B_fkey" FOREIGN KEY ("B") REFERENCES "CollectionsList"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NFTToNFTsList" ADD CONSTRAINT "_NFTToNFTsList_A_fkey" FOREIGN KEY ("A") REFERENCES "NFT"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NFTToNFTsList" ADD CONSTRAINT "_NFTToNFTsList_B_fkey" FOREIGN KEY ("B") REFERENCES "NFTsList"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("name") ON DELETE CASCADE ON UPDATE CASCADE;
