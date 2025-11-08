import { Attendance, Db } from "@/types/globals";
import { useCallback, useEffect, useState } from "react";

const useFetchAll = (db: Db) => {
  const [attendances, setAttendances] = useState<Attendance[] | undefined>(
    undefined
  );

  const handleFetch = useCallback(async () => {
    try {
      const attendances = await db.query.attendances.findMany({
        with: { employee: true },
      });
      setAttendances(attendances);
    } catch (error) {
      console.error(error);
    }
  }, [setAttendances]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { attendances, refetch: handleFetch };
};

export default useFetchAll;
