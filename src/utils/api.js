import axios from "axios";

const apiKey="9ee3c7ad9d7e42cde7e4451f44f0bdcf121ea9c0ae32df085ac202ee24dd3a846d229ade73a0027b66537c8819994ad7eec22e605a5b1dfe62b2403f0ad4f9ad9c11c7581d43a73c2d38dc90f22ef850540ddfc0c88b7f76e3ccb900e313e3f3eaf838d1776ee4fcad4b716af1c74c61f6bd62eca3269591704849de1d91d8b0"

const params={
    headers: {
        'Authorization': `Bearer ${apiKey}`, // Include your API key in the Authorization header
        'Content-Type': 'application/json', // Adjust the content type as needed
      },

} 

export const fetchDataFromApi=async(url)=>{
    try{
        const {data} = await axios.get("http://localhost:1337"+url, params)
        return data;
    }catch(error){
        console.log(error);
        return error;
    }
}


export const postData = async (url, formData ) => {
    const { res } = await axios.post("http://localhost:1337" + url,formData , params)
    return res;
}

export const deleteData = async (url, id ) => {
    const { res } = await axios.delete(`http://localhost:1337${url}${id}`, params)
    return res;
}