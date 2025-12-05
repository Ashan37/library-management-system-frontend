import {api} from "./api";

export const BooksService={
    getAll:()=>api.get("/books"),
    create:(data:any)=>api.post("/books",data),
    update:(id:string,data:any)=>api.put(`/books/${id}`,data),
    delete:(id:string)=>api.delete(`/books/${id}`),
}