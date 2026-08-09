import { readFileSync } from "node:fs";
import { join } from "node:path";

export type ImageDimensions = { width: number; height: number };

/** Read intrinsic PNG/JPEG dimensions from a file under `public/`. */
export function getPublicImageSize(src: string): ImageDimensions | undefined {
  const relative = src.replace(/^\//, "");
  const path = join(process.cwd(), "public", relative);

  try {
    const buf = readFileSync(path);
    if (buf.length >= 24 && buf[0] === 0x89 && buf.toString("ascii", 1, 4) === "PNG") {
      return {
        width: buf.readUInt32BE(16),
        height: buf.readUInt32BE(20),
      };
    }
    return readJpegSize(buf);
  } catch {
    return undefined;
  }
}

function readJpegSize(buf: Buffer): ImageDimensions | undefined {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return undefined;

  let offset = 2;
  while (offset < buf.length - 8) {
    if (buf[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buf[offset + 1];
    if (marker === 0xd9 || marker === 0xda) break;
    const size = buf.readUInt16BE(offset + 2);
    // SOF0 / SOF2 baseline/progressive
    if (marker === 0xc0 || marker === 0xc2) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + size;
  }
  return undefined;
}
