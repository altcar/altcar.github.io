export function decodeMojibake(str) {
  // Fix UTF-8 bytes misinterpreted as Latin-1
  return new TextDecoder('utf-8').decode(new TextEncoder('iso-8859-1').encode(str));
}