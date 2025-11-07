import { Db, Position } from "@/types/globals";
import { useCallback, useEffect } from "react";
import { useImmer } from "use-immer";

const useFetch = (db: Db) => {
  const [positions, setPositions] = useImmer<Position[] | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const positions = await db.query.positions.findMany();
      setPositions(positions);
    } catch (error) {
      console.error(error);
    }
  }, [setPositions]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { positions, refetch: handleFetch };
};

export default useFetch;
