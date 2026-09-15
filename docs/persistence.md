# Persistência

O estado é salvo em `localStorage` com chave própria e versão `1`. O carregamento aplica valores padrão, oferecendo ponto de migração ao alterar versões futuras. Reiniciar partida não apaga o save; apagar progresso pede confirmação.
