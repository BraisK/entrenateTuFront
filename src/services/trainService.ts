import Train from "../models/Train"
import { fetchAPI } from "../utils/FetchAPI"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class TrainService {
    static async search(title?: string) {
        let url = API_URL_BASE+'/trains?'
        if(title) url += 'title='+title

        return await fetchAPI(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }
    static async comunidad(title?: string) {
        let url = API_URL_BASE+'/comunidad?'
        if(title) url += 'title='+title

        return await fetchAPI(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getById(id:number) {
        return await fetchAPI(API_URL_BASE+'/trains/'+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async create(trains: Partial<Train>) {
        return await fetchAPI(API_URL_BASE+'/trains', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trains),
            credentials: 'include'
        })
    }

    static async update(id:number, trains: Partial<Train>) {
        return await fetchAPI(API_URL_BASE+'/trains/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trains),
            credentials: 'include'
        })
    }
    static async delete(id: number){
        return await fetchAPI(API_URL_BASE+'/trains/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }



}