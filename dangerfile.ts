import { danger, fail, warn, message, markdown } from 'danger'

const routeFile = danger.git.fileMatch('src/routes.ts')

if (routeFile.edited) {
  message('Você não adicionou nenhum endpoint nesse commit!')
}
