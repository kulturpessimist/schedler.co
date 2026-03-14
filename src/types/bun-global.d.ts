declare const Bun: {
  serve: (...args: any[]) => any;
  file: (...args: any[]) => any;
  write: (...args: any[]) => Promise<number>;
  spawnSync: (...args: any[]) => {
    exitCode: number;
    stdout: Uint8Array | ArrayBufferLike;
    stderr: Uint8Array | ArrayBufferLike;
  };
};
