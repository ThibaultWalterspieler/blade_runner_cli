# Blade Runner CLI

Due to browsers' same origin policy security restrictions ([CORS)](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)) coming from Three.js , loading my project from a file system will fail with a security exception.

There are two ways to solve this:

1. Run files from a [local web server](https://css-tricks.com/snippets/html/start-a-web-server-with-one-terminal-command-on-os-x/). This allows you to access your page as:
```bash
http://localhost/index.html
```
2. Change security for local files in a browser. This allows you to access your page as:
```bash
file:///index.html
```
If you use option 2, be aware that you may open yourself to some vulnerabilities if using the same browser for a regular web surfing. You may want to create a separate browser profile / shortcut used just for local development to be safe. Let's go over each option in turn.

For more information, read [Three.js documentation](https://threejs.org/docs/index.html#manual/en/introduction/How-to-run-things-locally).
