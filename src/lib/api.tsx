const BASE_URL = "https://belajar-spring-staging.up.railway.app/api";

export async function getVisits() {
  const PATH = "/v1/users/visit";
  const res = await fetch(`${BASE_URL}${PATH}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch visits");
  }

  const json = await res.json();
  return json.message.data; // mengembalikan array visit
}
