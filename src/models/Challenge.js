module.exports = class Challenge {
    constructor(numero_casas, token, cifrado, decifrado, resumo_criptografico) {
        this.numero_casas = numero_casas;
        this.token = token;
        this.cifrado = cifrado;
        this.decifrado = decifrado;
        this.resumo_criptografico = resumo_criptografico;
    }
}

