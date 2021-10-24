import { danger, fail, warn, message, markdown, schedule } from 'danger'
import noConsole from 'danger-plugin-no-console'

// Note: You need to use schedule()
schedule(noConsole())

const routeFile = danger.git.fileMatch('src/routes.ts')

if (routeFile.edited) {
  warn('Você alterou o arquivo de rotas')
}

danger.git.JSONDiffForFile('package.json').then((diff) => {
  console.log('Diff:', diff)
  if (diff.dependencies?.added.length > 0) {
    const depName = diff.dependencies?.added.map(item => item)
    warn(`Opaa!!! Você adicionou os seguintes pacotes:\n ${depName} \nCuidado com o tamanho do bundle! :)`)
  }
})
