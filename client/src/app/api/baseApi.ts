import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
 import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";
 
 const customBaseQuery = fetchBaseQuery({
     baseUrl: 'https://localhost:5001/api'
 });
 
 type ErrorResponse = | string | {title: string} | {errors: string[]}
 const sleep = () => new Promise(resolve => setTimeout(resolve, 100));
 
 export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, 
     extraOptions: object) => {
     api.dispatch(startLoading());
     await sleep(); 
     

        if (typeof args === "string") {  
            if(args.split("/")[1] === "undefined"){ 
                args = args.replace(args.split("/")[1], "")  
            }
        } else {
            console.error("Invalid args format:", args);
        }
     const result = await customBaseQuery(args, api, extraOptions);
     api.dispatch(stopLoading()); 

     if (result.error) {
        console.log(result.error)
        const originalStatus = result.error.status === 'PARSING_ERROR' && result.error.originalStatus ? result.error.originalStatus : result.error.status

        const responseData = result.error.data as ErrorResponse;
        
         switch (originalStatus) {
            case 400:
                if(typeof responseData === 'string') toast.error(responseData)
                else if ('errors' in responseData){
                throw Object.values(responseData.errors).flat().join(', ')
                }
                else toast.error(responseData.title)
                toast.error(responseData as string)
                break;
            case 401:
                if(typeof responseData === 'object' && 'title' in responseData)
                toast.error(responseData.title)
                break;
                case 404:
                    if(typeof responseData === 'object' && 'title' in responseData)
                        router.navigate('/notfound')

                    break;
                case 500:
                    if(typeof responseData === 'object')
                        router.navigate('/server-error', {state: {error: responseData}})
                    break;
            default:
                break;
         }
     }
 
     return result;
 }