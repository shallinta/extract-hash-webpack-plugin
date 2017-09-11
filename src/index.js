import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';

const getVersionFileContent = hash => JSON.stringify({
  version: hash
});

export default class GenerateVersionFileWebpackPlugin {
  constructor({ dest, filename = 'version.json', hashLength = 'normal', fn = getVersionFileContent }) {
    this.dest = dest;
    this.filename = filename;
    this.hashLength = hashLength;
    this.fn = fn;
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

      try {
        fs.accessSync(this.dest);
      } catch (err) {
        mkdirp.sync(this.dest);
      }

      fs.writeFileSync(path.resolve(this.dest, this.filename), this.fn(hash));
    });
  }
}
