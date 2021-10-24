import { danger, fail, warn, message, markdown } from 'danger'

const routeFile = danger.git.fileMatch('src/routes.ts')

if (routeFile.edited) {
  fail('Você alterou o arquivo de rotas')
}
