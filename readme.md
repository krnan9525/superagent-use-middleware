# superagent-use-middleware
A superAgent plugin helps you to create a middleware.

Under the hood, this module will call `.use` function on all superAgent request objects you specified rather than
traditionally you will need to call them every time. (please see examples below)
This module is written in typescript, the superAgent type definition is a part of this project's dependency.

## examples
```javascript
import superAgent from 'superagent'
import makeMiddleware from 'superagent-use-middleware'
const request = makeMiddleware(
  superAgent, // the superAgent object
  ['get', 'post', 'put', 'delete', 'options'] // (optional) methods you want to insert this middleware to 
)

export default request.use((req) => {
  req.header['api-version'] = localStorage.getItem('client_version_int')
  return req
})

// then you can call e.g. request.get(url) from other files that have this imported
```



__NOTE:__ This project is based on [superagent-use](https://github.com/koenpunt/superagent-use), adding typescript support,
removed `node-methods` and `assign` dependencies. Great shoot out to authors of `superagent-use`.

