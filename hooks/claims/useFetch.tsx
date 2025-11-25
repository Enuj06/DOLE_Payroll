import { claims } from "@/db/schema";
import { Claim, Db } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetch = (db: Db, id: number) => {
  const [claim, setClaim] = useState<Claim | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const claim = await db.query.claims.findFirst({
        with: { employee: true },
        where: eq(claims.id, id),
      });
      setClaim(claim);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [setClaim]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { claim, refetch: handleFetch };
};

export default useFetch;
