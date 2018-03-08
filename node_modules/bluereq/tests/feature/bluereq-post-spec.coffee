{ expect } = require 'chai'
bluereq = require '../../src/bluereq'
# test server config
port = 9090
host = "http://localhost:#{port}"
server = require '../fixtures/server'

describe 'bluereq', ->

  describe 'post request', ->

    describe 'without errors', ->

      validConfig = { url: "#{host}/json", json: { exampleParam: 'exampleValue' } }
      expectedRes = { statusCode: 200, body: { message: 'POST complete.', req: validConfig.json }}

      before -> server.start(port)
      after -> server.stop()

      describe '#post(url)', ->

        it 'triggers .then(res) function', (done) ->

          bluereq.post validConfig.url
          .then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body.message).to.equal expectedRes.body.message
            expect(res.body.req).to.deep.equal {}
            done()

          return

      describe '#post(config)', ->

        it 'triggers .then(res) function', (done) ->

          bluereq.post validConfig
          .then (res) ->
            expect(res.statusCode).to.equal expectedRes.statusCode
            expect(res.body).to.deep.equal expectedRes.body
            done()

          return

    describe 'with errors', ->

      invalidConfig = { url: '' }

      before -> server.start(port)
      after -> server.stop()

      describe '#post(url)', ->

        it 'triggers .catch(err) function', (done) ->

          bluereq.post invalidConfig.url
          .catch (err) ->
            expect(err).to.exist
            done()

          return


        it 'returns formatted server errors', (done) ->

          bluereq.post "#{host}/undefined-endpoint"
          .catch (err) ->
            expect(err).to.exist
            expect(err.statusCode).to.equal 404
            expect(err.statusMessage).to.equal 'Not Found'
            expect(err.headers).to.exist
            expect(err.body).to.exist
            expect(err.url).to.equal "#{host}/undefined-endpoint"
            done()

          return

      describe '#post(config)', ->

        it 'triggers .catch(res) function', (done) ->

          bluereq.post invalidConfig
          .catch (err) ->
            expect(err).to.exist
            done()

          return
