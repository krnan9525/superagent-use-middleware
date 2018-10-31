import { Plugin, SuperAgentStatic } from 'superagent'

export default function (superAgentInit: SuperAgentStatic, methods: string[]): SuperAgentCollection

export interface SuperAgentCollection extends SuperAgentStatic {
  use : ((fn: Plugin) => this)
}
