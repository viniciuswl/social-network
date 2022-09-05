import axios from "axios";
import constants from "../constants";

export default axios.create({
    baseURL: constants.SERVER_ADDRESS
})