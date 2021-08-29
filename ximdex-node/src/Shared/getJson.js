export default async function getJson(origin) {
  const data = await import(origin);
  return data.default;
}