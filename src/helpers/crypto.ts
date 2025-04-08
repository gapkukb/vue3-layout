//生成密钥：
async function generateKey() {
  const key = await crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt'],
  );
  return key;
}

//加密数据：
async function encryptData(key, data) {
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 生成随机初始向量
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    new TextEncoder().encode(data),
  );
  return { iv, encryptedData };
}

//解密数据：

async function decryptData(key, iv, encryptedData) {
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    encryptedData,
  );
  return new TextDecoder().decode(decryptedData);
}
