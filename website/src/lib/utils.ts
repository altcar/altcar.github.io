export function decodeMojibake(str: string | undefined) {
  // Fix UTF-8 bytes misinterpreted as Latin-1
  // TextDecoder/TextEncoder constructors do not accept arguments in this environment;
  // ensure we don't pass undefined into encode.
  return new TextDecoder().decode(new TextEncoder().encode(str ?? 'iso-8859-1'));
}