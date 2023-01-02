const util = require('util');
const express = require('express');
const router = express.Router();

const multer = require('multer');

const { GridFsStorage } = require('multer-gridfs-storage');
const { GridFSBucket, MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(process.env.DB_CONNECTION);
const bucket = new GridFSBucket(client.db('Test-Server'), {
  bucketName: 'uploads',
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.DB_CONNECTION,
  file: (req, file) => {
    const filename = file.originalname;
    return { filename, bucketName: 'uploads' };
  },
});
const upload = multer({ storage }).single('file');
const uploadFile = util.promisify(upload);

router.post('/upload', async (req, res) => {
  try {
    await uploadFile(req, res);
    res.json({ success: true, file: req.file });
  } catch (error) {
    const message = `File Error: ${error}`;
    res.status(500).send({ message });
  }
});

router.get('/download/:id/:name', async (req, res) => {
  try {
    const fileId = req.params.id;
    const filename = req.params.name;
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${filename}`);
    bucket.openDownloadStream(ObjectId(fileId)).pipe(res);
  } catch (error) {
    const message = `File Error: ${error}`;
    res.status(500).send({ message });
  }
});

module.exports = router;
