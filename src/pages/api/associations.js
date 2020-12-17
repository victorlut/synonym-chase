import axios from "axios";

// const api = process.env.NEXT_PUBLIC_X_RAPID_API_KEY;

// const options = {
//     url: '/associations/',
//     method: 'GET',
//     baseURL: 'https://twinword-word-associations-v1.p.rapidapi.com',
//     params: {entry: 'capable'},
//     headers: {
//         'x-rapidapi-key': api,
//         'x-rapidapi-host': 'twinword-word-associations-v1.p.rapidapi.com'
//     }
// };

// axios.request(options).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.error(error);
// });

//https://twinword-word-associations-v1.p.rapidapi.com/associations/?entry=sound"

const axiosConfig = {
    url: '/associations/',
    method: 'GET',
    baseURL: 'https://twinword-word-associations-v1.p.rapidapi.com',
    // params: {entry: 'capable'},
    headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
        'x-rapidapi-host': 'twinword-word-associations-v1.p.rapidapi.com'
    }
};

export default async (req, res) => {
    // query needs to be read from the internal caller params...
    const {q} = req.query;

    const response = await axios.get(
        `?entry=${q}`,
        axiosConfig
    );

    res.json(response.data);
}