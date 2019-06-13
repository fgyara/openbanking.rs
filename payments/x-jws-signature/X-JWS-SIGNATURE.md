# `X-JWS-SIGNATURE`

```sh
$ cd /tmp && git clone git@github.com:banaio/openbanking.rs.git && cd openbanking.rs/payments/x-jws-signature && yarn install && yarn start
...
yarn install && yarn start
yarn install v1.13.0
[1/4] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.09s.
yarn run v1.13.0
$ NODE_TLS_REJECT_UNAUTHORIZED=0 node index.js
(node:83785) Warning: Setting the NODE_TLS_REJECT_UNAUTHORIZED environment variable to '0' makes TLS connections and HTTPS requests insecure by disabling certificate verification.
****************************************************************************************************************************************************************
INFO: body= { keys:
   [ { e: 'AQAB',
       kid: 'QuFYBRJnWdI6_NHFgamuXNr5R20',
       kty: 'RSA',
       n:
        'tGzvc5H2KLufptikvbL1crtdSaV901mJY4dAxjWK2V-W6hhgNIgdQgusn3k8AW6KKFckDLIs0hYKmIJTVN0MGaruG4USN4sRlRT2kkizJaXU9ZtHZ5yiwP9BMEiaKgY6IGWy4vVxR9ii83HhAXbTo-gI9HaK73i2kLIYUYwiAUG32Oo5Z226dISMBiGxDU7EeLCJ8uhdKPTi05z5fPE0Lw3eszLwaJN8qQ1BIFON_QXCVS7BDMdmWh2XEEljD_h5d6W1SPXikWod2XWK9PbxbKzGkpIJHV_Ty74c48eQE3_0rkUEZ9iCHtuFxgN0SEy1Hj5-5TDMVXkVQO_rGyYv4w',
       use: 'sig',
       x5c: [Array],
       x5t: 'XRpUI7DLiKM34JyQetPZ5-VC4E4=',
       x5u:
        'https://keystore.openbankingtest.org.uk/0015800001041RbAAI/QuFYBRJnWdI6_NHFgamuXNr5R20.pem',
       'x5t#S256': 'DzlmJWsUUzUEPCRom1at9mdu32DZA4CTkWspPNNdyfs=' },
     { e: 'AQAB',
       kid: 'GyVVcMPbU4QucpelwnDNiUJR4qQ',
       kty: 'RSA',
       n:
        'vakAE3hb8opMX3zP6o929xh2ncsqAa9UtlbwZluVRFYZJb5s7-n4zqR2tqadaG57Fd6ZvhSqzq5qwd8ZvQeVM5N70ISwwXD5u9MFupjtmgLS3ioFucIbTNEmnobXppQC3eDTZI8x3DMkxy5H3za2e8ZFRrHwu6boNFQ-c7eibOQpmSAhD0G2CRm6sEK2uJuBEvUKQXZ5L6sli3Zd1TxsYxmO2x9fYkoml5Q_SK-OKi6x_MvDWxVOE1Ld1i4YhiPczDSgrWxPbMGh5iUdFT3Jikc3ppiE6E2h0HjQ0r1jQstlGScR5zul4-WQr9b8JEqYRK9uOE8dlW6zXu4mGtH36Q',
       use: 'tls',
       x5c: [Array],
       x5t: '47LacKAUQ_OcuAmsSomIywM9e4g=',
       x5u:
        'https://keystore.openbankingtest.org.uk/0015800001041RbAAI/GyVVcMPbU4QucpelwnDNiUJR4qQ.pem',
       'x5t#S256': '5G7DWO0Omk1GxnM_PTnpq29fY3FT81EVEAIvkYii-BI=' } ] }
INFO: key= JWKBaseKeyObject {
  keystore: JWKStore {},
  length: 2048,
  kty: 'RSA',
  kid: 'QuFYBRJnWdI6_NHFgamuXNr5R20',
  use: 'sig',
  alg: '' }
INFO: keystore= JWKStore {}
INFO: input= eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pYXQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lzcyIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIl0sImN0eSI6ImFwcGxpY2F0aW9uL2pzb24iLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCI6MTU2MDQxNTM3NiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiOiIwMDE1ODAwMDAxMDQxUmJBQUkvUkVmWktvN3pOMkllRTBYMlJGR1RiNCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIjoib3BlbmJhbmtpbmcub3JnLnVrIiwia2lkIjoiUXVGWUJSSm5XZEk2X05IRmdhbXVYTnI1UjIwIiwidHlwIjoiSk9TRSJ9.{"Data":{"Initiation":{"CreditorAccount":{"Identification":"GB29PAPA20000390210002","Name":"Mr Jackson","SchemeName":"IBAN"},"EndToEndIdentification":"GB29PAPA20000390210002","InstructedAmount":{"Amount":"1","Currency":"GBP"},"InstructionIdentification":"GB29PAPA20000390210002"}},"Risk":{}}.ITAs3fOnt4BSp7LCL9Bw8ntQencjzVVi2yMwbw0O98FAIHMMUQWMyOhhr2UenpDxArfgeOhBFTFGO4-F6iP96QNQUkGZugdlSXrc1wQTayT5d_lPrpxIFW4CiayTd1NnLDidMGkXgaz6xFrMKQ4TELxVlJJrjnYo-14m4eo_bwU0rhv9bioMriCJ2lesFXq1irqiAglfwxvI6xc7hL-_Rapz-DX-rGzVbX-W3v9vJuJWGiTcUBjw1ErmBjhC3uOUCbqz1EbNOc-uG9HJfNw_bvNKcUBcKsZnT1V7SBSh-a6ZOmMDXnzU8ocOrD5WEYl6epg60673vi8E7y8SU2u5UA
****************************************************************************************************************************************************************
verifying...

INFO: result= { protected:
   [ 'alg',
     'b64',
     'crit',
     'cty',
     'http://openbanking.org.uk/iat',
     'http://openbanking.org.uk/iss',
     'http://openbanking.org.uk/tan',
     'kid',
     'typ' ],
  header:
   { alg: 'PS256',
     b64: false,
     crit:
      [ 'b64',
        'http://openbanking.org.uk/iat',
        'http://openbanking.org.uk/iss',
        'http://openbanking.org.uk/tan' ],
     cty: 'application/json',
     'http://openbanking.org.uk/iat': 1560415376,
     'http://openbanking.org.uk/iss': '0015800001041RbAAI/REfZKo7zN2IeE0X2RFGTb4',
     'http://openbanking.org.uk/tan': 'openbanking.org.uk',
     kid: 'QuFYBRJnWdI6_NHFgamuXNr5R20',
     typ: 'JOSE' },
  payload:
   <Buffer 0d ab 5a 22 78 ad 89 ab 62 a2 70 ab 79 d8 ad a2 b0 1c 72 8b a7 b4 87 5e 9e d8 9f 89 c6 ad 8a 89 c6 07 6f 4f 00 f0 36 d3 4d 34 df dd 36 d7 4d 34 d8 d6 ... 115 more bytes>,
  signature:
   <Buffer 21 30 2c dd f3 a7 b7 80 52 a7 b2 c2 2f d0 70 f2 7b 50 7a 77 23 cd 55 62 db 23 30 6f 0d 0e f7 c1 40 20 73 0c 51 05 8c c8 e8 61 af 65 1e 9e 90 f1 02 b7 ... 206 more bytes>,
  key:
   JWKBaseKeyObject {
     keystore: JWKStore {},
     length: 2048,
     kty: 'RSA',
     kid: 'QuFYBRJnWdI6_NHFgamuXNr5R20',
     use: 'sig',
     alg: '' } }
****************************************************************************************************************************************************************
✨  Done in 0.47s.
```
