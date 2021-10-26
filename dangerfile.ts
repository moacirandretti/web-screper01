import { danger, warn } from 'danger'
import noConsole from 'danger-plugin-no-console'

noConsole()

const routeFile = danger.git.fileMatch('src/routes.ts')

// const diffs = danger.git.created_files
//   .concat(danger.git.modified_files)
//   .map(file => {
//     return danger.git.diffForFile(file).then(diff => ({
//       file,
//       diff
//     }))
//   })
// const findConsole = (content: any) => {
//   const PATTERN = /console\.(log|error|warn|info)/
//   const GLOBAL_PATTERN = new RegExp(PATTERN.source, 'g')
//   let matches = content.match(GLOBAL_PATTERN)
//   if (!matches) return []

//   matches = matches.filter(match => {
//     const singleMatch = PATTERN.exec(match)
//     if (!singleMatch || singleMatch.length === 0) return false
//   })

//   return matches
// }
// console.log('>>console1')
// console.log('>>matches', findConsole(diffs))

// if (findConsole(diffs)) {
//   warn('Você abandonou um console.log! :( ')
// }

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
