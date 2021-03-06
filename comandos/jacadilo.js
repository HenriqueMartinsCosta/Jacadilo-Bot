module.exports = {
    nome: 'jacadilo',
    descrição: "Envia o emoji jacadilo",
    uso: '``jacadilo jacadilo``, ``jacadilo jacadilo jacadilo``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, arg, bot, jacadilo){
        try{
            if(arg[1] == 'jacadilo'){
                mensagem.channel.send(`${bot.emojis.get(jacadilo)}`).then(mensagemEnviada => mensagemEnviada.react(jacadilo));
            }
            else{
                mensagem.channel.send(`${bot.emojis.get(jacadilo)}`);
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}