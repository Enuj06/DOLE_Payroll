import { employees } from "@/db/schema";
import { Db } from "@/types/globals";
import { eq } from "drizzle-orm";

const useDelete = (db: Db, refetch: () => void) => {
  const handleDelete = async (id: number) => {
    try {
      await db.delete(employees).where(eq(employees.id, id));
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return { handleDelete };
};

export default useDelete;
