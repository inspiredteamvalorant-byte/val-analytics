export const fetchAllData = async () => {
  const res = await fetch('/api/getAll.php');
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
