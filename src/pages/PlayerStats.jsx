import { useEffect, useState } from 'react';
import { fetchAllData } from '../api/supabaseFetch';

export default function PlayerStats() {
  const [txt, setTxt] = useState("");

  useEffect(() => {
    fetchAllData()
      .then(d => setTxt(JSON.stringify(d)))
      .catch(e => setTxt("ERROR FRONT → " + e.message));
  }, []);

  return <pre>{txt}</pre>;
}
