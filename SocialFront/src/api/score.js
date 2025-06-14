// import { request } from "../utilities/requestAI.js";
import axios from 'axios';

export async function getScore(data) {
  try {
    const url = `${process.env.VUE_APP_API_BASEURL_AI}:8000/analyze`;
    const response = await axios.post(url, data);
    // console.log("返回的分數:", response.data.score);
    // console.log("返回的評論:", response.data.comment);
    return response.data;  // 正確返回數據
  } catch (error) {
    console.error("Error:", error);
    return null;  // 請求失敗時返回 `null` 或其他預設值
  }
}



