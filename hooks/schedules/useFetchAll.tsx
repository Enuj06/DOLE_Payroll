import { Db, Schedule } from "@/types/globals";
import { useCallback, useEffect, useState } from "react";

const useFetchAll = (db: Db) => {
  const [schedules, setSchedules] = useState<Schedule[] | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const schedules = await db.query.schedules.findMany({
        with: { employees: true },
      });
      setSchedules(schedules);
    } catch (error) {
      console.error(error);
    }
  }, [setSchedules]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { schedules, refetch: handleFetch };
};

export default useFetchAll;
