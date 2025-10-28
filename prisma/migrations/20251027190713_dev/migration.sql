-- CreateTable
CREATE TABLE `Pelanggan` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `telepon` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_pelanggan` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `nota_no` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `Transaksi_nota_no_key`(`nota_no`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Barang` (
    `id` VARCHAR(191) NOT NULL,
    `nama_barang` VARCHAR(191) NOT NULL,
    `qty` INTEGER NOT NULL,
    `harga` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `id_transaksi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `Pelanggan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Barang` ADD CONSTRAINT `Barang_id_transaksi_fkey` FOREIGN KEY (`id_transaksi`) REFERENCES `Transaksi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
