# node 签名加密验证包

### Install

npm install signature-authenticator

### Usage

```js
var authenticator = require('signature-authenticator')('aqNTTxH0F', '0e31fb756214058c17a3a8859ca0ae4a');

console.log(authenticator.getValidUrl('http://apix.lingxi360.com/v1/contact/list'));
```
