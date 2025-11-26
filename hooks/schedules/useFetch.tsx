import { attendances } from "@/db/schema";
import { Db, Schedule } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetch = (db: Db, id: number) => {
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const schedule = await db.query.schedules.findFirst({
        with: { employees: true },
        where: eq(attendances.id, id),
      });

      setSchedule(schedule);
    } catch (error) {
      console.error(error);

      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [id, setSchedule]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { schedule, refetch: handleFetch };
};

export default useFetch;
