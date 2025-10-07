import CryptoJS from 'crypto-js';

const getEncryptionKey = () => {
  if (typeof window === 'undefined') return '';
  const token = localStorage.getItem('token');
  const envKey = process.env.NEXT_PUBLIC_CRYPTO_KEY || 'default-key-change-this';
  return token ? CryptoJS.SHA256(envKey + token).toString() : envKey;
};

export const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(data, getEncryptionKey()).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return data;
  }
};

export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, getEncryptionKey());
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedData;
  }
};