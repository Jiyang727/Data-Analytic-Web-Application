expect = require('chai').expect
argParser = require '../../src/arg-parser'
getOpts = require '../../src/get-options'
nullCb = (err, res) -> null

describe 'argParser', ->

  describe 'getOpts', ->

    describe '[url]', ->

      it 'returns a valid options object', ->
        args = ['http://example.dev']
        expect(getOpts(args).config).to.deep.equal { url: 'http://example.dev', json: true }
        expect(getOpts(args).callback).to.not.exist

    describe '[config]', ->

      it 'returns a valid options object', ->
        args = [{ url: 'http://example.dev' }]
        opts = getOpts(args)
        expect(opts.config).to.deep.equal args[0]
        expect(opts.callback).to.not.exist

      describe 'if hasData is false', ->

        it 'throws an error', ->
          expect(-> getOpts(args, false)).to.throw Error

    describe '[url, data]', ->

      args = ['http://example.dev', { message: 'JSON data' }]

      describe 'if "hasData" is true', ->

        it 'returns a valid options object', ->
          opts = getOpts(args, true)
          expect(opts.config).to.deep.equal { url: args[0], json: args[1] }
          expect(opts.callback).to.not.exist

      describe 'if hasData is false', ->

        it 'throws an error', ->
          expect(-> getOpts(args, false)).to.throw Error
