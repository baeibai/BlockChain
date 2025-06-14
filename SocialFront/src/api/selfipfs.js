//npm install @helia/core @helia/unixfs
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { createHelia } = require('@helia/core');
const { unixfs } = require('@helia/unixfs');
const fs = require('fs').promises;

const app = express();
const port = 3000;

// 設置 CORS 中間件
app.use(cors());

// 設置 multer 來處理文件上傳
const upload = multer({ dest: 'uploads/' });

// 初始化 Helia 客戶端
let helia, fsHelia;

async function initHelia() {
    helia = await createHelia();
    fsHelia = unixfs(helia);
}

initHelia().catch(console.error);

// 文件上傳路由
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        // 讀取文件並上傳到 IPFS
        const fileData = await fs.readFile(file.path);
        const added = await fsHelia.add(fileData);

        // 刪除臨時文件
        await fs.unlink(file.path);

        // 返回 IPFS 哈希
        res.json({ ipfsHash: added.cid.toString() });
    } catch (error) {
        console.error('Error uploading file to IPFS:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
