import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

export const useGetAdvocates = () => {
  const [loading, setLoading] = useState(false);

  const getAdvocates = async ({
    params,
    onSuccess,
    onError,
  }: {
    params?: {
      searchTerm?: string;
    };
    onSuccess: (response: Advocate[]) => void;
    onError: (error: AxiosError) => void;
  }) => {
    setLoading(true);
    try {
      const response: AxiosResponse<Advocate[]> = await axios.get(
        `/api/advocates`,
        {
          params,
        }
      );
      onSuccess(response.data);

      return response.data;
    } catch (error) {
      onError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAdvocates,
    loading,
  };
};
