request = require 'request'
Promise = require 'bluebird'
pick = require 'lodash.pick'
# attributes to keep from a response object with statusCode >= 400
errorAttributes = [
  'statusCode'
  'statusMessage'
  'headers'
  'body'
]

module.exports = (config) ->
  new Promise (resolve, reject)->
    request config, (err, res) ->
      if err? then reject err
      else
        if res.statusCode < 400 then resolve res
        else
          err = new Error res.statusMessage
          # copy all the data from res to err
          data = pick res, errorAttributes
          data.url = res.request.uri.href
          Object.assign(err, data)
          reject err
