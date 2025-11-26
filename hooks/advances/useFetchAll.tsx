import { Advance, Db } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetchAll = (db: Db) => {
  const [advances, setAdvances] = useState<Advance[] | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const advances = await db.query.advances.findMany({
        with: { employee: true },
      });

      setAdvances(advances);
    } catch (error) {
      console.error(error);

      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [setAdvances]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { advances, refetch: handleFetch };
};

export default useFetchAll;
