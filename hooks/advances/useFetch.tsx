import { advances } from "@/db/schema";
import { Advance, Db } from "@/types/globals";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";

const useFetch = (db: Db, id: number) => {
  const [advance, setAdvance] = useState<Advance | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const advance = await db.query.advances.findFirst({
        with: { employee: true },
        where: eq(advances.id, id),
      });
      setAdvance(advance);
    } catch (error) {
      console.error(error);
    }
  }, [setAdvance]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { advance, refetch: handleFetch };
};

export default useFetch;
