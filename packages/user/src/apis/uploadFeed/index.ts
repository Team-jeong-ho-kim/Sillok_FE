import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

const router = "feed";

export const usePostFeed = (setForm: React.Dispatch<React.SetStateAction<{ value: string }>>) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => {
      // 요청 직전에 FormData 내용 다시 확인
      console.log('Sending FormData contents:');
      for (let [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(key, '(File):', value.name, value.type, value.size);
        } else {
          console.log(key, ':', value);
        }
      }

      return axios.post(`https://sillok-stag-server.xquare.app/${router}`, data, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNewsDetail"] });
      toast.success("피드를 작성했어요.");
      setForm({ value: "" });
    },
    onError: (error) => {
      // 에러 응답 상세 내용 확인
      if (error instanceof Error && 'response' in error) {
        console.error('Error response:', {
          status: (error as any).response.status,
          statusText: (error as any).response.statusText,
            data: (error as any).response.data,
            headers: (error as any).response.headers
          });
        } else {
        console.error('Error:', error);
      }
      toast.error("피드 작성에 실패했어요.");
    },
  });

  return { mutate };
};