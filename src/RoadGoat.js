const access_key = "d40d6975f689549be1b6918c81574d47"
const secret_key = "dd2a53212a1a6ac42b9b07b6fbccff26"

var optionsByID = {
    'method': 'GET',
    'hostname': 'api.roadgoat.com',
    'port': 80,
    'path': '/api/v2/destinations/:id',
    'headers': {
        'Authorization': `Basic ${auth_key}`
    },
    'maxRedirects': 20
};

var optionsByQuery = {
    'method': 'GET',
    'hostname': 'api.roadgoat.com',
    'port': 80,
    'path': '/api/v2/destinations/auto_complete?q=',
    'headers': {
        'Authorization': `Basic ${auth_key}`
    },
    'maxRedirects': 20
};


export default {
    async autoFill(e) {
        var auth_key = btoa(`${access_key}:${secret_key}`)
        fetch(`https:/api.roadgoat.com/api/v2/destinations/auto_complete?q=${e.target.value}`,
            {
                'method': 'GET',
                'headers': {
                    'Authorization': `Basic ${auth_key} `
                }
            })
            .then(res => res.json())
    }
}