import {api} from "./api";

export const AuthService={
    login:(data:any)=>api.post("/auth/login",data),
    register:(data:any)=>api.post("/auth/register",data),
};