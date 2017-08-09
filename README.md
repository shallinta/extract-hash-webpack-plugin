# extract-hash-webpack-plugin

Extract webpack `compiler hash` to generate `version.json` file after build in the `dest` directory.

## Options

You can pass some configuration options to `ExtractHashWebpackPlugin`. Allowed values are as follows:

- `filename`:  Version file name. Default to `version.json`.
- `hashLength`: Substring length of compiler hash. Default to value `'normal'` which means the whole `hash` value itself. You can pass a `number` to get a substring of it. Or pass string `'full'` to get value of `fullHash`.
- `dest`: Version file save path. Default to `process.cwd()`.

## Example

Generate file `ver.json` in directory `path.resolve(process.cwd(), 'prd')`.
``` js
import ExtractHashWebpackPlugin from 'extract-hash-webpack-plugin';

var webpackConfig = {
  entry: 'main.js',
  output: {
    filename: '[name]-[hash:8].js',
    publicPath: '/js',
  },
  plugins: [
    new ExtractHashWebpackPlugin({
      dest: 'prd',
      filename: 'ver.json',
      hashLength: 8,
    })
  ]
};
```
Contents of `ver.json`:
```json
{
  "version": "[hash:8]"
}
```
