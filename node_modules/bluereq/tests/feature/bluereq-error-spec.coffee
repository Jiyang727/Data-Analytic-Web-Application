{ expect } = require 'chai'
bluereq = require '../../src/bluereq'
# test server config
port = 9090
host = "http://localhost:#{port}"
server = require '../fixtures/server'

describe 'error object', ->

  expectedErr = { statusCode: 404, statusMessage: 'Not Found', body: { message: 'Page not found' }}
  invalidConfig = { url: "#{host}/invalidroute", json: true }

  before -> server.start(port)
  after -> server.stop()

  it 'has the right statusCode and body', (done) ->

    bluereq.get invalidConfig.url
    .catch (err) ->
      expect(err.statusCode).to.equal expectedErr.statusCode
      expect(err.body).to.deep.equal expectedErr.body
      done()

    return
