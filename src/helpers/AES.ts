class AES {
  #AlgorithmName = 'AES-ECB';
  async encrypt(words: string, key: CryptoKey) {
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 生成随机初始向量
    const encrypted = await crypto.subtle.encrypt(
      {
        name: this.#AlgorithmName,
        iv: iv,
      },
      key,
      new TextEncoder().encode(words),
    );

    const base64String = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
    // const ivString = btoa(String.fromCharCode(...iv));

    return { iv: ivString, encryptedData: base64String };
  }

  async decrypt(words: ArrayBuffer, iv: Uint8Array<ArrayBuffer>, key: CryptoKey) {
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: this.#AlgorithmName,
        iv: iv,
      },
      key,
      words,
    );
    return new TextDecoder().decode(decryptedData);
  }

  #key() {
    return crypto.subtle.generateKey(
      {
        name: this.#AlgorithmName,
        length: 256,
      },
      true,
      ['encrypt', 'decrypt'],
    );
  }

  pkcs7Pad(data, blockSize) {
    const padLength = blockSize - (data.length % blockSize);
    const padding = new Uint8Array(padLength).fill(padLength);
    return new Uint8Array([...data, ...padding]);
  }

  pkcs7Unpad(data) {
    const padLength = data[data.length - 1];
    return data.slice(0, -padLength);
  }

  async example() {
    const key = await this.#key();
    const words = 'hello world';
    const { iv, encryptedData } = await this.encrypt(words, key);

    console.log('iv:', iv);
    console.log('encryptedData:', encryptedData);

    const decryptedData = await this.decrypt(encryptedData, iv, key);
    console.log('decryptedData:', decryptedData);
  }
}

const aes = new AES();
aes.example();
