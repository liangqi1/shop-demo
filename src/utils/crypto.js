import CryptoJS from 'crypto-js'
/**
* 密钥
*/
const secretKey = "ca43274076ad485e88659b193e51f001"

/**
* @function 加密
* @param {String} data 需要加密的内容
* @return {String} 解密结果
*/
export function Encrypt (data) {
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const scrs = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(scrs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const encryptedStr = encrypted.toString();
  return Str2Hex(encryptedStr)
}

/**
* @function 解密
* @param {String} data 需要解密的内容
* @return {String} 解密结果
*/
export function Decrypt(data) {
  const str = Hex2Str(data)
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const decrypt= CryptoJS.AES.decrypt(str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptStr = CryptoJS.enc.Utf8.stringify(decrypt).toString();
  return decryptStr
}