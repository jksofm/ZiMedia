import axios from "axios";


const customFetch = axios.create({
    baseURL : "https://zimedia.herokuapp.com/api/v1",
})

export default customFetch;