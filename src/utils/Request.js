import axios from "axios";

const Request = function(config = {}, result = (response) => {}, allways = () => {}) {
    axios({
        ...config,
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    }).then((resp) => result(resp)).catch(() => allways);
}


export default Request;