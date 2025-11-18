import { employees } from "@/db/schema";
import { Db, Employee } from "@/types/globals";
import { eq } from "drizzle-orm";
import { useCallback, useEffect, useState } from "react";

const useFetch = (db: Db, id: number) => {
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const employee = await db.query.employees.findFirst({
        with: { schedule: true, attendances: true, advances: true },
        where: eq(employees.id, id),
      });
      setEmployee(employee);
    } catch (error) {
      console.error(error);
    }
  }, [setEmployee]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { employee, refetch: handleFetch };
};

export default useFetch;
