import { request } from "../utils/request.js";

export function uploadToIPFS(data) {
  return request({
    'url': 'article/uploadIPFS',
    'method': 'post',
    'data': {
      'content': data
    }
  })
}

// import { createHelia } from 'helia';

// export async function uploadToIPFS(data) {
//   const helia = createHelia({
//     endpoint: 'https://api.helium.io', // Helium 接入点
//   });
//   try {
//     // 使用 Helia 将数据上传到 IPFS
//     const cid = await helia.add(data);
//     console.log('Data uploaded to IPFS with CID:', cid);
//     return cid;
//   } catch (error) {
//     console.error('Error uploading data to IPFS:', error);
//     throw error;
//   }


// }