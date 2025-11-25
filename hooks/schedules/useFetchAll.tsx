import { Db, Schedule } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

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
      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [setSchedules]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { schedules, refetch: handleFetch };
};

export default useFetchAll;
