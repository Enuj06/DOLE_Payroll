import { Db, Employee } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetchAll = (db: Db) => {
  const [employees, setEmployees] = useState<Employee[] | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const employees = await db.query.employees.findMany({
        with: {
          schedule: true,
          attendances: true,
          claims: true,
          advances: true,
        },
      });

      setEmployees(employees);
    } catch (error) {
      console.error(error);

      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [setEmployees]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { employees, refetch: handleFetch };
};

export default useFetchAll;
