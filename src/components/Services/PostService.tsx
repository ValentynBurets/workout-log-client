import axios from "axios";
import ConnectionConfig from "../../assets/jsonData/ConnectionConfig/ConnectionConfig.json";

const PostService = async (url: string, model: any): Promise<boolean> => {
  if (model == null) {
    alert("Please add text to the text box to create a new model");
    throw new Error("Model is null");
  }
  
  try {
    let token = localStorage.getItem("token");
    const response = await axios.post(`${ConnectionConfig.ServerUrl + url}`, model, {
      headers: { Authorization: `Bearer ${token}` },
    });

    switch (response.status) {
      case 202:
        return true;
      default:
        return false;
    }
  } catch (error) {
    console.log(error);
    alert(error);
    throw error;
  }
};

export default PostService;