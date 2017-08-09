import path from 'path';
import fs from 'fs';

export default class GenerateVersionFileWebpackPlugin {
  constructor({ dest, filename = 'version.json', hashLength = 'normal' }) {
    this.dest = dest;
    this.filename = filename;
    this.hashLength = hashLength;
  }

  apply(compiler) {
    if (!this.dest) {
      this.dest = path.resolve(process.cwd());
    } else {
      // eslint-disable-next-line
      this.dest = path.isAbsolute(this.dest) ? this.dest : path.resolve(process.cwd(), this.dest);
    }

    compiler.plugin('done', (stats) => {
      let hash = stats.hash;
      const fullHash = stats.compilation.fullHash;
      if (typeof this.hashLength === 'number') {
        hash = fullHash.substring(0, this.hashLength);
      } else if (this.hashLength === 'full') {
        hash = fullHash;
      }

      fs.writeFileSync(path.resolve(this.dest, this.filename), JSON.stringify({
        version: hash
      }));
    });
  }
}
