// import { create } from '@web3-storage/w3up-client';
// // import { Web3Storage } from 'web3.storage';

// class Web3StorageAPI {
//   constructor() {
//     this.accessToken = import.meta.env.VITE_WEB3_STORAGE;
//   }

//   async uploadFile(file) {
//     try {
//       const client = await create();
//       await client.setCurrentSpace(this.accessToken); // 修正此处
//       const { cid } = await client.uploadFile(file);
//       console.log('File uploaded successfully. CID:', cid);
//       return cid;
//     } catch (error) {
//       console.error('Error uploading file to Web3.storage:', error);
//       throw error;
//     }
//   }

//   async storeFiles(files) {
//     const client = this.makeStorageClient();
//     const cid = await client.put(files);
//     console.log('Stored files with CID:', cid);
//     return cid;
//   }

//   makeStorageClient() {
//     return new Web3Storage({ token: this.accessToken });
//   }

//   async getUploadNames() {
//     try {
//       const client = await create();
//       const uploadNames = [];
//       for await (const item of client.list({ maxResults: 10 })) {
//         uploadNames.push(item.name);
//       }
//       return uploadNames;
//     } catch (error) {
//       console.error('Error getting upload names from Web3.storage:', error);
//       throw error;
//     }
//   }
// }

// export default Web3StorageAPI;

import { create } from '@web3-storage/w3up-client'

async function uploadFile(filePath) {
  try {
    const client = await create();
    await client.login('qq10455006@gmail.com');
    await client.setCurrentSpace(import.meta.env.VITE_WEB3_STORAGE);
    const { cid } = await client.uploadFile(filePath);
    console.log('File uploaded successfully. CID:', cid);
    return cid;
  } catch (error) {
    console.error('Error uploading file to Web3.storage:', error);
    throw error;
  }
}

export default uploadFile;
