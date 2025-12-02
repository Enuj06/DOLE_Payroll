import { Db, Employee } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetch = (db: Db, id: number) => {
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const employee = await db.query.employees.findFirst();

      setEmployee(employee);
    } catch (error) {
      console.error(error);

      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [id, setEmployee]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { employee, refetch: handleFetch };
};

export default useFetch;
