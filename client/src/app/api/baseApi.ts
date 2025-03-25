import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
 import { startLoading, stopLoading } from "../layout/uiSlice";
 
 const customBaseQuery = fetchBaseQuery({
     baseUrl: 'https://localhost:5001/api'
 });
 
 const sleep = () => new Promise(resolve => setTimeout(resolve, 100));
 
 export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, 
     extraOptions: object) => {
     api.dispatch(startLoading());
     await sleep(); 
     console.error("outside", args);

        if (typeof args === "string") {  
            if(args.split("/")[1] === "undefined"){ 
                args = args.replace(args.split("/")[1], "")  
            }
        } else {
            console.error("Invalid args format:", args);
        }
     const result = await customBaseQuery(args, api, extraOptions);
     //api.dispatch(stopLoading());
     console.log("API request args:", args);

     if (result.error) {
         const {status, data} = result.error;
         console.log({status, data});
     }
 
     return result;
 }