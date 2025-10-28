// app/lib/prisma.ts

declare global {
  // biar tidak inisialisasi ulang di dev
  var __prismaClient: any;
}

export async function getPrisma() {
  if (global.__prismaClient) return global.__prismaClient;
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  if (process.env.NODE_ENV !== "production") global.__prismaClient = prisma;
  return prisma;
}
