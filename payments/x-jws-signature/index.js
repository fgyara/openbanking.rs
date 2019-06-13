const jose = require('node-jose');
const request = require('request');

const SEPERATOR = '*'.repeat(process.stdout.columns);

const URL = 'https://keystore.openbankingtest.org.uk/0015800001041RbAAI/REfZKo7zN2IeE0X2RFGTb4.jwks';
const KID = 'QuFYBRJnWdI6_NHFgamuXNr5R20';
// example with periods in payload that fails verification
// const token = [
//     'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pYXQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lzcyIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIl0sImN0eSI6ImFwcGxpY2F0aW9uL2pzb24iLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCI6MTU2MDM0OTIwOCwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiOiIwMDE1ODAwMDAxMDQxUmJBQUkvUkVmWktvN3pOMkllRTBYMlJGR1RiNCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIjoib3BlbmJhbmtpbmcub3JnLnVrIiwia2lkIjoiUXVGWUJSSm5XZEk2X05IRmdhbXVYTnI1UjIwIiwidHlwIjoiSk9TRSJ9',
//     '{"Data":{"Initiation":{"CreditorAccount":{"Identification":"GB29PAPA20000390210002","Name":"Mr Jackson","SchemeName":"UK.OBIE.IBAN"},"EndToEndIdentification":"GB29PAPA20000390210002","InstructedAmount":{"Amount":"1.00","Currency":"GBP"},"InstructionIdentification":"GB29PAPA20000390210002"}},"Risk":{}}',
//     'knWwq7QKxsNjTgV3_4mn-lyhmHNEzImdG4rR_0j__JkjRhuaW6YysXhdrJm-EdKFXMfNfj-aH1pLAsquH65GItwYBQA3enaViV6ffwzD9cPQbNy8PLdGcP1UgsxKx-1ZouVncVcPYBTZiEy_hMH_RwLMnhB5P36LXmPbZQMROPiGNjOLhfM4z4mTyX_9nJg0hA3y2kq_3GZEOR6-LK3k-N_cdQziFsnGPw6W_7NifKY--yyT6gQEktdGRHADOyR4iilnC38uUJ8fXrQri-FqPFvyCA8krlGvPXTUpCWNQF5pGBU05gHzvPNSV3b67DHAmnvr0vl03eVRZnmpC8fvIQ'
// ];

// example without periods in payload that passes verfification
const TOKEN = [
    'eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pYXQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lzcyIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIl0sImN0eSI6ImFwcGxpY2F0aW9uL2pzb24iLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCI6MTU2MDQxNTM3NiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiOiIwMDE1ODAwMDAxMDQxUmJBQUkvUkVmWktvN3pOMkllRTBYMlJGR1RiNCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIjoib3BlbmJhbmtpbmcub3JnLnVrIiwia2lkIjoiUXVGWUJSSm5XZEk2X05IRmdhbXVYTnI1UjIwIiwidHlwIjoiSk9TRSJ9',
    '{"Data":{"Initiation":{"CreditorAccount":{"Identification":"GB29PAPA20000390210002","Name":"Mr Jackson","SchemeName":"IBAN"},"EndToEndIdentification":"GB29PAPA20000390210002","InstructedAmount":{"Amount":"1","Currency":"GBP"},"InstructionIdentification":"GB29PAPA20000390210002"}},"Risk":{}}',
    'ITAs3fOnt4BSp7LCL9Bw8ntQencjzVVi2yMwbw0O98FAIHMMUQWMyOhhr2UenpDxArfgeOhBFTFGO4-F6iP96QNQUkGZugdlSXrc1wQTayT5d_lPrpxIFW4CiayTd1NnLDidMGkXgaz6xFrMKQ4TELxVlJJrjnYo-14m4eo_bwU0rhv9bioMriCJ2lesFXq1irqiAglfwxvI6xc7hL-_Rapz-DX-rGzVbX-W3v9vJuJWGiTcUBjw1ErmBjhC3uOUCbqz1EbNOc-uG9HJfNw_bvNKcUBcKsZnT1V7SBSh-a6ZOmMDXnzU8ocOrD5WEYl6epg60673vi8E7y8SU2u5UA'
];
const INPUT = TOKEN.join('.');

request(URL, { json: true }, async (err, res, body) => {
    if (err) {
        console.error(SEPERATOR);
        console.error('ERROR: ', err);
        console.error(SEPERATOR);
        process.exit(1);
    } else {
        console.log(SEPERATOR);
        console.log('INFO: body=', body);
        const keystore = await jose.JWK.asKeyStore(body);
        const key = await keystore.get(KID);
        console.log('INFO: key=', key);
        console.log('INFO: keystore=', keystore);
        console.log('INFO: INPUT=', INPUT);
        console.log(SEPERATOR);
        console.log('verifying...');
        console.log('');

        const opts = {
            handlers: {
                "b64": true,
                "typ": true,
                "kid": true,
                "b64": true,
                "cty": true,
                "http://openbanking.org.uk/iat": true,
                "http://openbanking.org.uk/iss": true,
                "http://openbanking.org.uk/tan": true,
                "alg": true,
                "crit": true,
            }
        };
        const result = await jose.JWS.createVerify(key).verify(INPUT, opts);
        console.log('INFO: result=', result);
        console.log(SEPERATOR);
    }
});

// Example with periods (.) in payload
// ./server	[2019-06-12T15:20:08+01:00]  WARN ************************************************************************************************************
// ./server	[2019-06-12T15:20:08+01:00]  WARN  CalcKid=QuFYBRJnWdI6_NHFgamuXNr5R20
// ./server	[2019-06-12T15:20:08+01:00]  WARN ************************************************************************************************************
// ./server	[2019-06-12T15:20:08+01:00]  WARN ************************************************************************************************************
// ./server	[2019-06-12T15:20:08+01:00]  WARN  minifiedBody={"Data":{"Initiation":{"CreditorAccount":{"Identification":"GB29PAPA20000390210002","Name":"Mr Jackson","SchemeName":"UK.OBIE.IBAN"},"EndToEndIdentification":"GB29PAPA20000390210002","InstructedAmount":{"Amount":"1.00","Currency":"GBP"},"InstructionIdentification":"GB29PAPA20000390210002"}},"Risk":{}}
// ./server	[2019-06-12T15:20:08+01:00]  WARN  tokenString=eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pYXQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lzcyIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIl0sImN0eSI6ImFwcGxpY2F0aW9uL2pzb24iLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCI6MTU2MDM0OTIwOCwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiOiIwMDE1ODAwMDAxMDQxUmJBQUkvUkVmWktvN3pOMkllRTBYMlJGR1RiNCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIjoib3BlbmJhbmtpbmcub3JnLnVrIiwia2lkIjoiUXVGWUJSSm5XZEk2X05IRmdhbXVYTnI1UjIwIiwidHlwIjoiSk9TRSJ9.{"Data":{"Initiation":{"CreditorAccount":{"Identification":"GB29PAPA20000390210002","Name":"Mr Jackson","SchemeName":"UK.OBIE.IBAN"},"EndToEndIdentification":"GB29PAPA20000390210002","InstructedAmount":{"Amount":"1.00","Currency":"GBP"},"InstructionIdentification":"GB29PAPA20000390210002"}},"Risk":{}}.knWwq7QKxsNjTgV3_4mn-lyhmHNEzImdG4rR_0j__JkjRhuaW6YysXhdrJm-EdKFXMfNfj-aH1pLAsquH65GItwYBQA3enaViV6ffwzD9cPQbNy8PLdGcP1UgsxKx-1ZouVncVcPYBTZiEy_hMH_RwLMnhB5P36LXmPbZQMROPiGNjOLhfM4z4mTyX_9nJg0hA3y2kq_3GZEOR6-LK3k-N_cdQziFsnGPw6W_7NifKY--yyT6gQEktdGRHADOyR4iilnC38uUJ8fXrQri-FqPFvyCA8krlGvPXTUpCWNQF5pGBU05gHzvPNSV3b67DHAmnvr0vl03eVRZnmpC8fvIQ
// ./server	[2019-06-12T15:20:08+01:00]  WARN  detachedJWS=eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pYXQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lzcyIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIl0sImN0eSI6ImFwcGxpY2F0aW9uL2pzb24iLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCI6MTU2MDM0OTIwOCwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiOiIwMDE1ODAwMDAxMDQxUmJBQUkvUkVmWktvN3pOMkllRTBYMlJGR1RiNCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIjoib3BlbmJhbmtpbmcub3JnLnVrIiwia2lkIjoiUXVGWUJSSm5XZEk2X05IRmdhbXVYTnI1UjIwIiwidHlwIjoiSk9TRSJ9..knWwq7QKxsNjTgV3_4mn-lyhmHNEzImdG4rR_0j__JkjRhuaW6YysXhdrJm-EdKFXMfNfj-aH1pLAsquH65GItwYBQA3enaViV6ffwzD9cPQbNy8PLdGcP1UgsxKx-1ZouVncVcPYBTZiEy_hMH_RwLMnhB5P36LXmPbZQMROPiGNjOLhfM4z4mTyX_9nJg0hA3y2kq_3GZEOR6-LK3k-N_cdQziFsnGPw6W_7NifKY--yyT6gQEktdGRHADOyR4iilnC38uUJ8fXrQri-FqPFvyCA8krlGvPXTUpCWNQF5pGBU05gHzvPNSV3b67DHAmnvr0vl03eVRZnmpC8fvIQ
// ./server	[2019-06-12T15:20:08+01:00]  WARN ************************************************************************************************************

// Example without periods in payload
// ./server	[2019-06-13T09:42:56+01:00]  WARN ************************************************************************************************************
// ./server	[2019-06-13T09:42:56+01:00]  WARN  CalcKid=QuFYBRJnWdI6_NHFgamuXNr5R20
// ./server	[2019-06-13T09:42:56+01:00]  WARN ************************************************************************************************************
// ./server	[2019-06-13T09:42:56+01:00]  WARN ************************************************************************************************************
// ./server	[2019-06-13T09:42:56+01:00]  WARN  minifiedBody={"Data":{"Initiation":{"CreditorAccount":{"Identification":"GB29PAPA20000390210002","Name":"Mr Jackson","SchemeName":"IBAN"},"EndToEndIdentification":"GB29PAPA20000390210002","InstructedAmount":{"Amount":"1","Currency":"GBP"},"InstructionIdentification":"GB29PAPA20000390210002"}},"Risk":{}}
// ./server	[2019-06-13T09:42:56+01:00]  WARN  tokenString=eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pYXQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lzcyIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIl0sImN0eSI6ImFwcGxpY2F0aW9uL2pzb24iLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCI6MTU2MDQxNTM3NiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiOiIwMDE1ODAwMDAxMDQxUmJBQUkvUkVmWktvN3pOMkllRTBYMlJGR1RiNCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIjoib3BlbmJhbmtpbmcub3JnLnVrIiwia2lkIjoiUXVGWUJSSm5XZEk2X05IRmdhbXVYTnI1UjIwIiwidHlwIjoiSk9TRSJ9.{"Data":{"Initiation":{"CreditorAccount":{"Identification":"GB29PAPA20000390210002","Name":"Mr Jackson","SchemeName":"IBAN"},"EndToEndIdentification":"GB29PAPA20000390210002","InstructedAmount":{"Amount":"1","Currency":"GBP"},"InstructionIdentification":"GB29PAPA20000390210002"}},"Risk":{}}.ITAs3fOnt4BSp7LCL9Bw8ntQencjzVVi2yMwbw0O98FAIHMMUQWMyOhhr2UenpDxArfgeOhBFTFGO4-F6iP96QNQUkGZugdlSXrc1wQTayT5d_lPrpxIFW4CiayTd1NnLDidMGkXgaz6xFrMKQ4TELxVlJJrjnYo-14m4eo_bwU0rhv9bioMriCJ2lesFXq1irqiAglfwxvI6xc7hL-_Rapz-DX-rGzVbX-W3v9vJuJWGiTcUBjw1ErmBjhC3uOUCbqz1EbNOc-uG9HJfNw_bvNKcUBcKsZnT1V7SBSh-a6ZOmMDXnzU8ocOrD5WEYl6epg60673vi8E7y8SU2u5UA
// ./server	[2019-06-13T09:42:56+01:00]  WARN  detachedJWS=eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0IiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pYXQiLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lzcyIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIl0sImN0eSI6ImFwcGxpY2F0aW9uL2pzb24iLCJodHRwOi8vb3BlbmJhbmtpbmcub3JnLnVrL2lhdCI6MTU2MDQxNTM3NiwiaHR0cDovL29wZW5iYW5raW5nLm9yZy51ay9pc3MiOiIwMDE1ODAwMDAxMDQxUmJBQUkvUkVmWktvN3pOMkllRTBYMlJGR1RiNCIsImh0dHA6Ly9vcGVuYmFua2luZy5vcmcudWsvdGFuIjoib3BlbmJhbmtpbmcub3JnLnVrIiwia2lkIjoiUXVGWUJSSm5XZEk2X05IRmdhbXVYTnI1UjIwIiwidHlwIjoiSk9TRSJ9..ITAs3fOnt4BSp7LCL9Bw8ntQencjzVVi2yMwbw0O98FAIHMMUQWMyOhhr2UenpDxArfgeOhBFTFGO4-F6iP96QNQUkGZugdlSXrc1wQTayT5d_lPrpxIFW4CiayTd1NnLDidMGkXgaz6xFrMKQ4TELxVlJJrjnYo-14m4eo_bwU0rhv9bioMriCJ2lesFXq1irqiAglfwxvI6xc7hL-_Rapz-DX-rGzVbX-W3v9vJuJWGiTcUBjw1ErmBjhC3uOUCbqz1EbNOc-uG9HJfNw_bvNKcUBcKsZnT1V7SBSh-a6ZOmMDXnzU8ocOrD5WEYl6epg60673vi8E7y8SU2u5UA
// ./server	[2019-06-13T09:42:56+01:00]  WARN ************************************************************************************************************