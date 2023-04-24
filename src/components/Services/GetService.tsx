import axios from "axios";

const OrderListServiceGetAllOrders = {
    request: async function (url: string) {
        return await axios({
            url: url,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            switch (response.status) {
                case 200:
                    return { data: response.data };
                default:
                    return { data: null };
            }
        }).catch((error) => {
            console.log(error.toString());
            return { data: null };
        });
    }
}

export default OrderListServiceGetAllOrders;