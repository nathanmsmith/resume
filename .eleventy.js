const yaml = require('js-yaml')
const katex = require('katex')

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter('katex', (value) => {
    if (value.toLowerCase() === 'latex') {
      return katex.renderToString('\\LaTeX')
    }
    return value
  })
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.safeLoad(contents))
  // eleventyConfig.dir = { data: '.' }
  // return eleventyConfig
}
