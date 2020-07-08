module.exports = {
    nome: 'copypaste',
    descrição: 'Envia um copypaste aleatório',
    uso: '``jacadilo copypaste``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, fs, bot, cooldownCopypaste, laranjo){
        try{
            let tempoCooldown = 300;
            let autor = mensagem.author.id;
            if(cooldownCopypaste.has(autor)){
                let tempoRestante = tempoCooldown - cooldownCopypaste.autor;

                let tempoRestanteMin = Math.trunc(tempoRestante/60);
                
                let tempoRestanteSeg = tempoRestante - (tempoRestanteMin * 60);

                if(tempoRestante >= 60){
                    mensagem.channel.send(`Calma lá amigão, só vou mandar outro copypaste em ${tempoRestanteMin} min e ${tempoRestanteSeg} seg ⏲️`);
                }
                else{
                    mensagem.channel.send(`Calma lá amigão, só vou mandar outro copypaste em ${tempoRestante} seg ⏲️`);
                }
            }
            else{
                let decadencia = "680614291581305008";
                if(mensagem.channel.id != decadencia){
                    mensagem.channel.send(`Só vou mandar copypaste no ${mensagem.guild.channels.get(decadencia)} ${bot.emojis.get(laranjo)}`);
                }
                else{
                    let quantidade = fs.readFileSync('./copypaste/!Quantidade.txt', 'utf8');
                
                    let numero = Math.floor(Math.random() * quantidade) + 1;
                
                    let texto = fs.readFileSync("./copypaste/" + numero + ".txt", 'utf8');
                    texto = texto.replace(/@pessoa/g, "<@" + mensagem.guild.members.randomKey() + ">");
                
                    mensagem.channel.send(texto);
                }

                //inicia cooldown
                cooldownCopypaste.add(autor);
                cooldownCopypaste.autor = 0;

                let timer = setInterval(() => {
                    cooldownCopypaste.autor += 1;                   
                    
                    if (cooldownCopypaste.autor == tempoCooldown){
                        cooldownCopypaste.delete(autor);
                        clearInterval(timer);
                    }
                }, 1000);
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}