import debug from 'debug';


export default (namespace) => debug(`promise-async-cache:${namespace || '*'}`);
