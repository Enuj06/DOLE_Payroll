import { employees } from "@/db/schema";
import { Db, Employee } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetch = (db: Db, id: number) => {
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const employee = await db.query.employees.findFirst({
        with: {
          schedule: true,
          attendances: true,
          claims: true,
          advances: true,
        },
        where: eq(employees.id, id),
      });
      setEmployee(employee);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [setEmployee]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { employee, refetch: handleFetch };
};

export default useFetch;
