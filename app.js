const CryptoJS = require('crypto-js');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3300;
const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true
}

// Middleware untuk melayani file statis
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Halo Selamat Datang')
})

// Enkripsi
// AES
app.get('/encryption/AES', (req, res) => {
  // Enkripsi
  try{
    const secretKey = req.query.key;
    const data = req.query.data;
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    res.json({data: encodeURIComponent(encryptedData)});
  }catch (error) {
    console.error('Gagal Melakukan Enkripsi', error);
    res.status(500).send('Gagal Melakukan Enkripsi');
  }
});
// akhir AES

// TripleDES
app.get('/encryption/3DES', (req, res) => {
  // Enkripsi
  try{
    const secretKey = req.query.key;
    const data = req.query.data;
    const encryptedData = CryptoJS.TripleDES.encrypt(data, secretKey).toString();
    res.json({data: encodeURIComponent(encryptedData)});
  }catch (error) {
    console.error('Gagal Melakukan Enkripsi', error);
    res.status(500).send('Gagal Melakukan Enkripsi');
  }
});
// akhir TripleDES

// RSA
app.get('/encryption/RSA', (req, res) => {
  // Enkripsi
  try{
    // Generate RSA key pair
    const RSAKey = CryptoJS.lib.WordArray.random(512 / 8);
    const publicKey = RSAKey.toString(CryptoJS.enc.Base64);
    const privateKey = RSAKey.toString(CryptoJS.enc.Base64);

    // Data yang akan dienkripsi
    const data = req.query.data;

    // Enkripsi dengan kunci publik
    const encryptedData = CryptoJS.AES.encrypt(data, publicKey).toString();
    res.json({ key: encodeURIComponent(privateKey), data: encodeURIComponent(encryptedData) });
  }catch (error) {
    console.error('Gagal Melakukan Enkripsi', error);
    res.status(500).send('Gagal Melakukan Enkripsi');
  }
});
// akhir RSA
// Akhir Enkripsi


// Dekripsi
// AES
app.get('/decryption/AES', (req, res) => {
  try{
    const encryptedData = req.query.data;
    const secretKey = req.query.key;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    res.send(decryptedData);
  }
  catch(error){
    console.error('Gagal Melakukan Dekripsi', error);
    res.status(500).send('Gagal Melakukan Dekripsi');
  }
});
// Akhir AES

// TripleDES
app.get('/decryption/3DES', (req, res) => {
  try{
    const encryptedData = req.query.data;
    const secretKey = req.query.key;
    const bytes = CryptoJS.TripleDES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    res.send(decryptedData);
  }
  catch(error){
    console.error('Gagal Melakukan Dekripsi', error);
    res.status(500).send('Gagal Melakukan Dekripsi');
  }
});
// Akhir TripleDES

// RSA
app.get('/decryption/RSA', (req, res) => {
  try{
    const encryptedData = req.query.data;
    const secretKey = req.query.key;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    res.send(decryptedData);
  }
  catch(error){
    console.error('Gagal Melakukan Dekripsi', error);
    res.status(500).send('Gagal Melakukan Dekripsi');
  }
});
// Akhir RSA
// Akhir Dekripsi

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
