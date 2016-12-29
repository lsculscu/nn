require('babel-register');
//import resolveRoute from './ResolveRoute';
import { route } from 'app/RootRoute';
 
//const router = require('router').default;
//const Sitemap = require('../').default;
 
(
	console.log('this is route');
	console.log(route);
    new Sitemap(route)
        .build('http://steemcrawl.com/')
        .save('./sitemap.xml')
);