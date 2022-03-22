// export default () => {
    
//     const access_key = "d40d6975f689549be1b6918c81574d47"
//     const secret_key = "dd2a53212a1a6ac42b9b07b6fbccff26"

//     var net = require('follow-redirects').https;
//     var fs = require('fs');
//     var auth_key = Buffer.from(`${access_key}:${secret_key}`).toString('base64');

//     var optionsByID = {
//         'method': 'GET',
//         'hostname': 'api.roadgoat.com',
//         'port': 80,
//         'path': '/api/v2/destinations/:id',
//         'headers': {
//             'Authorization': `Basic ${auth_key}`
//         },
//         'maxRedirects': 20
//     };

//     var optionsByQuery = {
//         'method': 'GET',
//         'hostname': 'api.roadgoat.com',
//         'port': 80,
//         'path': '/api/v2/destinations/auto_complete?q=',
//         'headers': {
//             'Authorization': `Basic ${auth_key}`
//         },
//         'maxRedirects': 20
//     };

//     var req = net.request(optionsByID, function (res) {
//         var chunks = [];

//         res.on("data", function (chunk) {
//             chunks.push(chunk);
//         });

//         res.on("end", function (chunk) {
//             var body = Buffer.concat(chunks);
//             console.log(body.toString());
//         });

//         res.on("error", function (error) {
//             console.error(error);
//         });
//     });

//     req.end();
// }