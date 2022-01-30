import axios from "axios";

const baseUrl = "https://localhost:44362/api/";

const api = {
    boats(url = baseUrl +"boats/"){
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: boat => axios.post(url, boat),
            update: (id, boat) => axios.put(url+id, boat),
            delete: id => axios.delete(url + id)
        }
    }
}

export default api;