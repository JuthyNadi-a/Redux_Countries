import axios from "axios";

const baseUrl = 'https://restcountries.com/v3.1/all';

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data
}

export default { getAll }