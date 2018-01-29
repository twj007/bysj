
//aes算法ctr计数模式
var aesjs = require('aes-js');


//加密
/*
* @params 明文 密钥
*
*/
var encrypt = function(word, strKey){
  var textBytes = aesjs.utils.utf8.toBytes(word);

  var key = str2UTF8(strKey);
  // The counter is optional, and if omitted will begin at 1
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

  // To print or store the binary data, you may convert it to hex
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  // console.log(encryptedHex);
  // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
  //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"
  return encryptedHex;

};

//解密
/** params 密文 密钥
*
**/
var decrypt = function(encryptedHex, strKey){
  var key = str2UTF8(strKey);
  // When ready to decrypt the hex string, convert it back to bytes
  var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

  // The counter mode of operation maintains internal state, so to
  // decrypt a new instance must be instantiated.
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
  // Convert our bytes back into text
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  // console.log(decryptedText);
  // "Text may be any length you wish, no padding is required."
  return decryptedText;
};

//将密钥转换成直接数组
function str2UTF8(str){
    var bytes = new Array();
    var len,c;
    len = str.length;
    for(var i = 0; i < len; i++){
        c = str.charCodeAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF){
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }else if(c >= 0x000800 && c <= 0x00FFFF){
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }else if(c >= 0x000080 && c <= 0x0007FF){
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        }else{
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
}
module.exports = {
  encrypt,
  decrypt
}
