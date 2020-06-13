const yaml = require('js-yaml')

module.exports = (eleventyConfig) => {
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.safeLoad(contents))
  // eleventyConfig.dir = { data: '.' }
  // return eleventyConfig
}
