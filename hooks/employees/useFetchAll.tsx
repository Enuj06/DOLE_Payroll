import { Db, Employee } from "@/types/globals";
import { useCallback, useEffect, useState } from "react";

const useFetchAll = (db: Db) => {
  const [employees, setEmployees] = useState<Employee[] | undefined>(undefined);

  const handleFetch = useCallback(async () => {
    try {
      const employees = await db.query.employees.findMany();
      setEmployees(employees);
    } catch (error) {
      console.error(error);
    }
  }, [setEmployees]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { employees, refetch: handleFetch };
};

export default useFetchAll;
