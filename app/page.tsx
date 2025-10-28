// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect otomatis ke daftar transaksi
  redirect("/transaksi/daftar");
  return null;
}
