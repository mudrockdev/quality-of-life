// Polyfill CompressionStream on Bun 1.3
import { Readable, Writable } from "node:stream";
import zlib from "node:zlib";

const transformMap = {
  deflate: zlib.createDeflate,
  "deflate-raw": zlib.createDeflateRaw,
  gzip: zlib.createGzip,
};

// @ts-ignore
globalThis.CompressionStream ??= class CompressionStream {
  readable;
  writable;
  constructor(format: "deflate" | "deflate-raw" | "gzip") {
    const handle = transformMap[format]();
    this.readable = Readable.toWeb(handle);
    this.writable = Writable.toWeb(handle);
  }
};
