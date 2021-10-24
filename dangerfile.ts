import { danger, fail, warn, message, markdown } from 'danger'

const routeFile = danger.git.fileMatch('src/routes.ts')

if (routeFile.edited) {
  fail('Você alterou o arquivo de rotas')
}

danger.git.JSONDiffForFile('package.json').then((diff) => {
  // if (diff.dependencies) {

  // }
  console.log('Diff:', diff)
})
