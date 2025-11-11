import { attendances } from "@/db/schema";
import { Attendance, Db } from "@/types/globals";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";

const useFetch = (db: Db, id: number) => {
  const [attendance, setAttendance] = useState<Attendance | undefined>(
    undefined
  );

  const handleFetch = useCallback(async () => {
    try {
      const attendance = await db.query.attendances.findFirst({
        with: { employee: true },
        where: eq(attendances.id, id),
      });
      setAttendance(attendance);
    } catch (error) {
      console.error(error);
    }
  }, [setAttendance]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { attendance, refetch: handleFetch };
};

export default useFetch;
