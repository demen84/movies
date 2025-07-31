import axios from 'axios';

// axios({
//     method: "",
//     url: "",
//     data: "",
//     responseType: "",
//     headers: { },
//     timeout: "",
//     responseType: "",
// })

const api = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/"
});

api.interceptors.request.use((config) => {
    // console.log(config);
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const accessToken = user ? user.accessToken : null;

    return {
        ...config,
        headers: {
            TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MyIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2ODY5NDQwMDAwMCIsIm5iZiI6MTc0MTg4ODgwMCwiZXhwIjoxNzY4ODQ1NjAwfQ.rosAjjMuXSBmnsEQ7BQi1qmo6eVOf1g8zhTZZg6WSx4",
            Authorization: accessToken ? `Bearer ${accessToken}` : ""
        },
    };
});

export default api;

// Shorthand methods for Axios HTTP requests: Axios also provides a set of shorthand methods for performing different types of requests.The methods include:

// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.options(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])