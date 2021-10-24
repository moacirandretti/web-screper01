import { Router } from 'express'
import { WebScreper } from './controllers/webScraper01.controller'
import { WebScreperPupperteer } from './controllers/webScraper02.controller'

export const route = Router()
const webScreper = new WebScreper()
const webScreperPupperteer = new WebScreperPupperteer()

route.get('/webscreper01', webScreper.execute)
route.get('/webscreper02', webScreperPupperteer.execute)
route.get('/webscreper03', webScreperPupperteer.execute)
