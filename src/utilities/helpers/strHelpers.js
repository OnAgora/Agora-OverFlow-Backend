// convert any string to camelCase
const toCamelCase = (str) => (
    str.toLowerCase()
      .replace( /['"]/g, '' )
      .replace( /\W+/g, ' ' )
      .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
      .replace( / /g, '' )
)

const toCapitalCamelCase = (str) => (
  str
    .replace(/\b(\w)/g, (match, capture) => capture.toUpperCase())
    .replace(/\s+/g, '')
)

const removeSpace = (str) => str.replace(/\s/g,'');

module.exports = {
  toCamelCase,
  toCapitalCamelCase,
  removeSpace,
}
