import { useEffect, useState } from "react";
import { disasterService } from "../services/disasterService";

export const useDisasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    disasterService
      .getAll()
      .then(setDisasters)
      .finally(() => setLoading(false));
  }, []);

  return { disasters, loading };
};
