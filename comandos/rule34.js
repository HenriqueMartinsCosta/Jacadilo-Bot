module.exports = {
    nome: 'rule34',
    descrição: 'Envia uma imagem aleatória do site _Rule34_ sobre o termo(s) de pesquisa inserido',
    uso: '``jacadilo rule34 <termo de pesquisa>``',
    argumentos: '-',
    permissãoNecessária: '-',
    executar(mensagem, gerenciadorErros, arg, bot, request, cheerio, discord, laranjo, thonk, cursed){
        try{
            nsfw = '288043615895420929';
            if(mensagem.channel.id != nsfw){
                mensagem.reply(`só vou mandar uma imagem de rule34 no ${mensagem.guild.channels.get(nsfw)} ${bot.emojis.get(laranjo)}`);
            }
            else if(arg[1] == 'jacadilo'){
                mensagem.channel.send(`${bot.emojis.get(cursed)}`);
            }
            else{
                var pesquisa = mensagem.content.slice(16, mensagem.content.length);

                var opções = {
                    url: "https://rule34.xxx/index.php?page=post&s=list&tags=" + pesquisa,
                    method: "GET",
                    headers: {
                        "Accept": "text/html",
                        "User-Agent": "Chrome"
                    }
                };
                var underline = false;

                rule34(opções);

                function rule34(opções){
                    request(opções, function(erro, response, responseBody){
                        if (erro) {
                            return;
                        }
                        $ = cheerio.load(responseBody);
                        var links = $("span.thumb a");
                        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
                        if(!urls.length){
                            if(underline){
                                mensagem.channel.send(`Não encontrei nenhuma imagem sobre isso ${bot.emojis.get(thonk)}`);
                                return;
                            }
                            else{
                                let termosPesquisa = pesquisa.split(' ');
                                let novaPesquisa = '';
                                for(let i = 0; i < termosPesquisa.length; i++){
                                    novaPesquisa += termosPesquisa[i];
                                    if(i != termosPesquisa.length - 1 && termosPesquisa[i] != '') novaPesquisa += '_';
                                }
                                opções.url = "https://rule34.xxx/index.php?page=post&s=list&tags=" + novaPesquisa;
                                underline = true;
                                rule34(opções);
                            }
                        }
                        else{
                            opções.url = 'https://rule34.xxx/' + urls[Math.floor(Math.random() * urls.length)];
    
                            request(opções, function(erro, response, responseBody){
                                if (erro) {
                                    mensagem.channel.send('Ocorreu um erro');
                                    return;
                                }
                                $ = cheerio.load(responseBody);
                                var link = $("div#right-col.content img#image");
                                var urlRule34 = new Array(link.length).fill(0).map((v, i) => link.eq(i).attr("src"));
    
                                let embed = new discord.RichEmbed();
                                    embed.setColor('#D00CD2');
                                    embed.setImage(urlRule34.toString());
                                mensagem.channel.send(embed);
                            });
                        }
                    });
                }
            }
        }
        catch(err){
            gerenciadorErros(err, mensagem);
        }
    }
}