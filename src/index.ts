import {Plugin, SuperAgentStatic} from 'superagent'

const superAgentMethods : string[] = ['get', 'post', 'put', 'delete', 'options']

export interface SuperAgentCollection extends SuperAgentStatic {
  use : ((fn: Plugin) => this)
}

export default (superAgentInit: SuperAgentStatic, methods: string[] = superAgentMethods) : SuperAgentCollection => {

  const superAgentInternal: SuperAgentCollection = Object.assign({}, superAgentInit) as SuperAgentCollection

  const uses: Plugin[] = []

  superAgentInternal.use = function (fn: Plugin) {
    uses.push(fn)
    return this
  }

  methods.forEach(method => {
    switch (method) {
      case 'get' || 'post' || 'put' || 'delete' || 'options':
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
