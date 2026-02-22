

## Interface de Login HUD Sci-Fi - RotaSmart

### Visao Geral
Criar uma tela de login imersiva com estetica de ficção cientifica (HUD - Heads-Up Display), com aneis rotativos animados, diagnosticos de sistema em tempo real, logs de terminal e atmosfera futurista. Totalmente responsiva para mobile.

### Componentes a Criar

**1. `src/pages/Auth.tsx`** - Pagina principal de autenticacao
- Gerencia estados de login/signup/reset-password
- Verifica sessao existente e redireciona ao dashboard
- Listener `onAuthStateChange` configurado antes de `getSession`

**2. `src/components/auth/HudLoginScreen.tsx`** - Tela principal do HUD
- Fundo escuro com grade de linhas finas (grid pattern via CSS)
- Particulas flutuantes animadas (pontos de luz se movendo)
- Aneis concentricos rotativos ao redor do formulario central
- Diagnosticos laterais com dados simulados em tempo real (CPU, MEM, LATENCY)
- Terminal de logs ativo com mensagens rolando automaticamente
- Formulario central transparente com inputs estilizados neon
- Alternancia entre Login e Cadastro

**3. `src/components/auth/HudRings.tsx`** - Aneis rotativos SVG
- 3 aneis concentricos com velocidades e direcoes diferentes
- Tracos, pontos e marcadores ao longo dos aneis
- Animacao CSS `@keyframes rotate` continua
- Efeito de glow azul/ciano

**4. `src/components/auth/HudDiagnostics.tsx`** - Painel de diagnosticos
- Barras de progresso animadas (CPU, MEMORY, NETWORK)
- Valores numericos atualizando a cada segundo
- Indicadores de status piscando (ONLINE, SECURE, SYNCED)
- Fonte monoesspacada, estetica de terminal

**5. `src/components/auth/HudTerminal.tsx`** - Terminal de logs
- Mensagens de log aparecendo sequencialmente com efeito typewriter
- Mensagens como: `[SYS] Initializing RotaSmart v3.7...`, `[AUTH] Awaiting credentials...`, `[NET] Connection secure - TLS 1.3`
- Scroll automatico para baixo
- Fonte monoesspacada verde/ciano sobre fundo semi-transparente

**6. `src/pages/ResetPassword.tsx`** - Pagina de reset de senha (obrigatoria)
- Verifica `type=recovery` na URL hash
- Chama `supabase.auth.updateUser({ password })` 
- Estilo consistente com o tema HUD

### Atualizacoes em Arquivos Existentes

**`src/App.tsx`**
- Adicionar rota `/auth` para a pagina de login
- Adicionar rota `/reset-password` para reset de senha

**`src/pages/Index.tsx`**
- Verificar sessao do usuario; se nao autenticado, redirecionar para `/auth`
- Adicionar listener `onAuthStateChange`

**`src/index.css`**
- Adicionar keyframes para rotacao dos aneis (`hud-rotate`, `hud-rotate-reverse`)
- Adicionar keyframes para pulso de glow (`hud-glow-pulse`)
- Adicionar keyframes para digitacao do terminal (`hud-typewriter`)
- Adicionar keyframes para particulas flutuantes (`hud-float`)
- Adicionar estilos da grade de fundo do HUD
- Adicionar classe `.font-mono-hud` para fonte monoesspacada

### Design Visual (Detalhes)

- **Paleta**: Fundo `#0a0e1a`, aneis `#00d4ff` (ciano), acentos `#7b61ff` (roxo), texto `#00ff88` (verde terminal)
- **Tipografia**: Inter para UI, `monospace` para terminal/diagnosticos
- **Layout Mobile**: Aneis menores, diagnosticos acima e abaixo do formulario, terminal compacto
- **Animacoes**: Rotacao suave 20-60s por anel, glow pulsante 2s, logs a cada 1.5s

### Fluxo de Autenticacao

1. Usuario abre o app -> verifica sessao
2. Sem sessao -> redireciona para `/auth`
3. Tela HUD carrega com animacoes
4. Usuario faz login ou cadastro (email + senha + nome/telefone no cadastro)
5. Cadastro: email de verificacao enviado (sem auto-confirm)
6. Login: redireciona para `/` (dashboard)
7. Esqueceu senha: envia email com link para `/reset-password`

### Secao Tecnica

- Autenticacao via `supabase.auth.signInWithPassword()` e `supabase.auth.signUp()`
- Signup inclui `emailRedirectTo: window.location.origin`
- Reset usa `supabase.auth.resetPasswordForEmail()` com `redirectTo: window.location.origin + '/reset-password'`
- Perfil ja existe na tabela `profiles` (campos: email, name, phone, user_id)
- Apos signup, inserir registro na tabela `profiles`
- Animacoes feitas em CSS puro (sem libs extras)
- SVGs inline para os aneis rotativos

