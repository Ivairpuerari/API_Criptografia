const sha1      = require( 'sha1' );
const Challenge = require( '../models/Challenge' );
const FormData  = require( 'form-data' );
const axios     = require('axios'); 

var fs = require('fs');

module.exports = {
    getChallenge(token){

        return challenge;
    },

    julioCesarEncripty(salto, cifrado) {
        var alphabet = [];
        var decifrado = ''

        for(i=9,a='';++i<36;) alphabet.push(i.toString(36))

        for(var c of cifrado) {
            if (c != " " && c != ".") {
                if (alphabet.indexOf(c) < salto) {
                    const r = alphabet.indexOf(c) - salto;
                    decifrado = decifrado  + alphabet[alphabet.length + r];
                }else {
                    decifrado = decifrado + alphabet[((alphabet.indexOf(c) - salto))] ;
                }  
            }
            else{
                decifrado = decifrado + c
            } 
        }

        return decifrado;
    },

    async solveChallenge( req, res ) {
        const {token} = req.body;

        axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token='+token)
             .then((response) => {
                const {numero_casas,  token, cifrado, decifrado, resumo_criptografico} = response.data;
        
                var challenge =  new Challenge(numero_casas, token, cifrado, decifrado, resumo_criptografico);

                challenge.decifrado = module.exports.julioCesarEncripty( challenge.numero_casas, challenge.cifrado );
                
                challenge.resumo_criptografico = sha1( challenge.decifrado );
        
                var formData = new FormData();    
                formData.append( 'answer', JSON.stringify(challenge), {filename: 'answer.json'});
                
                
                const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                
                const r = await axios.post('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token='+challenge.token, formData, config)
                            .then((r) => console.log(r)).catch((r)=> console.log(r));
               
                res.status( r.status ).json( r );
            })
            .catch((error) => {
                res.status(error.response.status).json(error.response);
        })


    }
}