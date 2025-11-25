import { attendances } from "@/db/schema";
import { Attendance, Db } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

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
      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [setAttendance]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { attendance, refetch: handleFetch };
};

export default useFetch;
