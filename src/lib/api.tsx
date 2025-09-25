const BASE_URL = "https://stg.invyti.com/api";

export async function getVisits() {
  const PATH = "/v1/users/visit";

  try {
    const res = await fetch(`${BASE_URL}${PATH}`, { cache: "no-store" });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return []; // return array kosong kalau gagal
    }

    const json = await res.json();
    return json.message?.data || []; // fallback kalau message/data tidak ada
  } catch (err) {
    console.error("Fetch failed:", err);
    return []; // return array kosong kalau exception
  }
}
