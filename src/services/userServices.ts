import { fetchAPI } from "../utils/FetchAPI";

const API_URL_BASE = 'http://localhost:3000/api/'

export class UserService {
    static async getAll() {
        return await fetchAPI(API_URL_BASE + "/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    }
}