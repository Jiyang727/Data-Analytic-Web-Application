{ expect } = require 'chai'
bluereq = require '../../src/bluereq'
# test server config
port = 9090
host = "http://localhost:#{port}"
server = require '../fixtures/server'

describe 'bluereq', ->

  describe 'delete request', ->

    describe 'without errors', ->

      expectedRes = { statusCode: 200, body: { message: 'DELETE complete.' }}
      validConfig = { url: "#{host}/json", json: true }

      before -> server.start(port)
      after -> server.stop()

      describe '#delete(url)', ->

        it 'triggers .then(res) function', (done) ->

          bluereq.delete validConfig.url
          .then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

          return

      describe '#delete(config)', ->

        it 'triggers .then(res) function', (done) ->

          bluereq.delete validConfig
          .then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

          return

    describe 'with errors', ->

      invalidConfig = { url: '' }

      describe '#delete(url)', ->

        it 'triggers .catch(err) function', (done) ->

          bluereq.delete invalidConfig.url
          .catch (err) ->
            expect(err).to.exist
            done()

          return

      describe '#delete(config)', ->

        it 'triggers .catch(res) function', (done) ->

          bluereq.delete invalidConfig
          .catch (err) ->
            expect(err).to.exist
            done()

          return
