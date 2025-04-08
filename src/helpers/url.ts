export function encode(url: string, depth = 3) {
  for (let index = 0; index < depth; index++) {
    url = encodeURIComponent(url);
  }
  return url;
}
export function decode(url: string) {
  let decodedUrl = url;
  do {
    decodedUrl = decodeURIComponent(url);
  } while (url === decodedUrl);

  return decodedUrl;
}
