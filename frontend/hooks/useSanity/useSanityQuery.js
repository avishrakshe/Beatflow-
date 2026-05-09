'use client';

import { useEffect, useState } from 'react';

export function useSanityQuery(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        setLoading(true);
        const res = await fetch(endpoint, { cache: 'no-store' });
        const json = await res.json();
        if (!ignore) setData(json?.data ?? null);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => {
      ignore = true;
    };
  }, [endpoint]);

  return { data, loading, error };
}
