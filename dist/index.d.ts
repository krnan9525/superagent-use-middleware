import {SuperAgentStatic} from 'superagent'
import {SuperAgentCollection} from "../src"

declare const request: ((superAgentInit: SuperAgentStatic, methods: string[]) => SuperAgentCollection)
export = request
