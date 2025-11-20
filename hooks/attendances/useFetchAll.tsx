import { Attendance, Db } from "@/types/globals";
import { useCallback, useEffect, useState } from "react";

const useFetchAll = (db: Db) => {
  const [attendances, setAttendances] = useState<Attendance[] | undefined>(
    undefined
  );

  const handleFetch = useCallback(async () => {
    try {
      const attendances: Attendance[] = await db.query.attendances.findMany({
        with: { employee: true },
      });

      const schedules = await db.query.schedules.findMany();

      attendances.forEach((attendance) => {
        if (attendance.employee) {
          const schedule = schedules.find((schedule) => {
            return schedule.id === attendance.employee?.schedule_id;
          });
          attendance.employee.schedule = schedule;
        }
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
