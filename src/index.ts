import {Plugin, SuperAgentStatic} from 'superagent'
import {SuperAgentCollection} from '../dist'

const superAgentMethods : string[] = ['get', 'post', 'put', 'delete', 'options']

export default (superAgentInit: SuperAgentStatic, methods: string[] = superAgentMethods) : SuperAgentCollection => {

  const superAgentInternal: SuperAgentCollection = Object.assign({}, superAgentInit) as SuperAgentCollection

  const uses: Plugin[] = []

  superAgentInternal.use = function (fn: Plugin) {
    uses.push(fn)
    return this
  }

  methods.forEach(method => {
    switch (method) {
      case 'get':
      case 'post':
      case 'put':
      case 'delete':
      case 'options':
        superAgentInternal[method] = function() {
          let singleRequest = superAgentInit[method].apply(superAgentInternal, arguments)
          uses.forEach(function(use) {
            singleRequest = singleRequest.use(use)
          })
          return singleRequest
        }
    }
  })

  return superAgentInternal
}
