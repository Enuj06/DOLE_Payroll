import { Db, EmployeeDb } from "@/types/globals";
import { useCallback, useEffect } from "react";
import { useImmer } from "use-immer";

const useFetch = (db: Db) => {
  const [employees, setEmployees] = useImmer<EmployeeDb[] | undefined>(
    undefined
  );

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

export default useFetch;
