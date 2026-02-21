Esta aba gerencia vários canais de mensagens conectados ao aplicativo (Discord, Slack, Google Chat, Telegram, etc.).

![Channels Tab](channels-tab.png)

## Visualizando a Lista de Canais
Você pode ver todos os canais conectados e o status de cada conta rapidamente.

- **Emblema de Status**: Exibe estados como `connected`, `disconnected` ou `error`.
- **Atualizar**: Clique no botão de atualização no canto superior direito para obter o status mais recente.

## Login do Canal (QR Code)
Você pode iniciar um login via web para conectar um canal específico.
Ao dizer ao avatar de IA no chat, "Start Discord web login", ele exibirá um código QR ou entrará em um estado de espera de autenticação, se necessário.

## Integração do Bot do Discord

Faça login com sua conta do Discord em [naia.nextain.io](https://naia.nextain.io) para vincular sua conta automaticamente. Uma vez vinculada, você pode conversar diretamente com o avatar de IA no Discord.

### Como Usar
1. **Faça login com o Discord** em naia.nextain.io
2. Clique no link de convite do bot na página **Configurações > Integrações**
3. **Selecione um servidor** para adicionar o bot → aprove as permissões
4. **@mencione o bot** no servidor ou **inicie um DM** para conversar
5. Os créditos são deduzidos automaticamente da sua conta naia.nextain.io

### Recursos
- **Detecção de menção/DM**: A IA responde quando você menciona o bot ou envia um DM
- **Integração de créditos**: Os créditos da sua conta naia.nextain.io são usados automaticamente
- **Orientação para usuários não registrados**: Usuários sem uma conta vinculada recebem instruções de configuração
- **Limite de taxa**: Limite de 10 mensagens por minuto para proteger seus créditos

## Integração do Google Chat

Faça login com sua conta do Google em naia.nextain.io para conversar com o avatar de IA através do Google Chat.

### Como Usar
1. **Faça login com o Google** em naia.nextain.io
2. Um administrador do Google Workspace **registra o aplicativo Naia Chat**
3. Adicione o aplicativo no Google Chat e comece a conversar
4. Os créditos são deduzidos automaticamente da sua conta naia.nextain.io

## Notificações do Messenger (Webhooks)
Naia OS herda o poderoso sistema de canais do OpenClaw.
Ao inserir seu URL de Webhook do Slack, Discord ou Google Chat no menu **Configurações > Ferramentas > Webhooks** ou durante a tela de integração inicial, o avatar de IA pode enviar-lhe mensagens com os resultados de tarefas importantes.

> **Dica:** "Avise-me no Discord quando este backup de arquivo estiver completamente concluído!"

## Avançado: Crie um Bot Autônomo 24 horas por dia, 7 dias por semana
Ao utilizar a ferramenta de comando de terminal (`execute_command`), você pode transformar o avatar de IA em um agente autônomo 24 horas por dia, 7 dias por semana, que reside no Telegram ou Discord, indo além do seu desktop.

Comande o avatar de IA no chat assim:
> "Meu token de bot do Telegram é `1234:ABC...`. Execute `openclaw channels add --channel telegram --token 1234:ABC...` para iniciar meu bot do Telegram."

Agora, mesmo que você feche o aplicativo de desktop, você pode conversar com o avatar de IA e atribuir tarefas a qualquer momento através do Telegram em seu telefone via o OpenClaw Gateway em segundo plano.