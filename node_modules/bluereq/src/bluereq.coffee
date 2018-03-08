request = require './promisified-request'
parseArgs = require './arg-parser'

customRequest = (method, args...) ->
  opts = parseArgs method, args
  return request opts.config, opts.callback

module.exports =
  get: customRequest.bind null, 'get'
  post: customRequest.bind null, 'post'
  delete: customRequest.bind null, 'delete'
  put: customRequest.bind null, 'put'
  head: customRequest.bind null, 'head'
  patch: customRequest.bind null, 'patch'
