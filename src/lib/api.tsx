const BASE_URL = "https://stg.invyti.com/api";

export async function getVisits(page = 0) {
  const PATH = `/v1/users/visit?page=${page}`;

  try {
    const res = await fetch(`${BASE_URL}${PATH}`, { cache: "no-store" });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return { visits: [], totalPages: 0 };
    }
    const json = await res.json();
    return {
      visits: json.message?.data || [],
      totalPages: json.message?.totalPages || 0,
    };
  } catch (err) {
    console.error("Fetch failed:", err);
    return { visits: [], totalPages: 0 };
  }
}