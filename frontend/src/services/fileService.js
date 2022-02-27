import axios from "axios";

const uploadImage = async (file) => {
    const url = "https://api.cloudinary.com/v1_1/nades/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hq1sgzlw");

    const response = await axios.post(url, formData).then(res => {
        return {
            status: res.status,
            data: res.data
        };
    }).catch(error => {
        if(error.response && error.response.status <= 500) {
            return {
                status: error.response.status,
                message: 'Unauthorized Request',
            };
        }
        return {
            status: 500,
            message: "Unexpected Server Error",
        };
    });

    return response;
}

const fileService = {
    uploadImage,
}

export default fileService;
