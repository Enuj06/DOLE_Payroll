import { Advance, Db } from "@/types/globals";
import { useCallback, useEffect, useState } from "react";

const useFetchAll = (db: Db) => {
  const [advances, setAdvances] = useState<Advance[] | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const advances = await db.query.advances.findMany({
        with: { employee: true },
      });
      setAdvances(advances);
    } catch (error) {
      console.error(error);
    }
  }, [setAdvances]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { advances, refetch: handleFetch };
};

export default useFetchAll;
