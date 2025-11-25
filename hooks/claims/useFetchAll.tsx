import { Claim, Db } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetchAll = (db: Db) => {
  const [claims, setClaims] = useState<Claim[] | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const claims = await db.query.claims.findMany({
        with: { employee: true },
      });
      setClaims(claims);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [setClaims]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { claims, refetch: handleFetch };
};

export default useFetchAll;
