module.exports =
  matches: (args, signature...) ->
    if args.length isnt signature.length then return false

    for sig, i in signature
      if typeof args[i] isnt sig then return false

    return true
