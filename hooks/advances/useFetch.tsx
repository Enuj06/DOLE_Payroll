import { advances } from "@/db/schema";
import { Advance, Db } from "@/types/globals";
import { toastVisibilityTime } from "@/utils/globals";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const useFetch = (db: Db, id: number) => {
  const [advance, setAdvance] = useState<Advance | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const advance = await db.query.advances.findFirst({
        with: { employee: true },
        where: eq(advances.id, id),
      });
      setAdvance(advance);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "An Error Has Occured. Please Try Again.",
        visibilityTime: toastVisibilityTime,
      });
    }
  }, [setAdvance]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { advance, refetch: handleFetch };
};

export default useFetch;
