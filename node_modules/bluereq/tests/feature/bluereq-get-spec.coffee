{ expect } = require 'chai'
bluereq = require '../../src/bluereq'
# test server config
port = 9090
host = "http://localhost:#{port}"
server = require '../fixtures/server'

describe 'bluereq', ->

  describe 'get request', ->

    describe 'without errors', ->

      expectedRes = { statusCode: 200, body: { message: 'GET complete.' }}
      validConfig = { url: "#{host}/json", json: true }

      before -> server.start(port)
      after -> server.stop()

      describe '#get(url)', ->

        it 'triggers .then(res) function', (done) ->

          bluereq.get validConfig.url
          .then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

          return

      describe '#get(config)', ->

        it 'triggers .then(res) function', (done) ->

          bluereq.get validConfig
          .then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

          return

    describe 'with errors', ->

      invalidConfig = { url: '' }

      describe '#get(url)', ->

        it 'triggers .catch(err) function', (done) ->

          bluereq.get invalidConfig.url
          .catch (err) ->
            expect(err).to.exist
            done()

          return

      describe '#get(config)', ->

        it 'triggers .catch(res) function', (done) ->

          bluereq.get invalidConfig
          .catch (err) ->
            expect(err).to.exist
            done()

          return
