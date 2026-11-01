import { api } from "@core/api"
import { useQueryClient,useMutation } from "@tanstack/react-query"

export const useLogout=()=>{
const queryClient=useQueryClient()

      return  useMutation({
    mutationFn:api.logout,
    
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['session']})
    }
    
    })
      }
