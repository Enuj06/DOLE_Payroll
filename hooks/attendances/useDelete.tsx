import { attendances } from "@/db/schema";
import { Db } from "@/types/globals";
import { eq } from "drizzle-orm";

const useDelete = (db: Db, refetch: () => void) => {
  const handleDelete = async (id: number) => {
    try {
      await db.delete(attendances).where(eq(attendances.id, id));
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return { handleDelete };
};

export default useDelete;
