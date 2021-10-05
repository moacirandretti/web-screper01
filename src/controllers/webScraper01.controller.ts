/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import axios from 'axios'
import cheerio from 'cheerio'

export class WebScreper {
  constructor() {

  }

  async execute(request: Request, response: Response): Promise<any> {
    const urlToGet = 'https://g1.globo.com/mg/minas-gerais/'
    try {
      const webData = (await axios(urlToGet)).data
      const $ = cheerio.load(webData)
      const showMoreButton = $('div.load-more.gui-color-primary-bg')
      console.log('>>showMoreButton', showMoreButton)
      const arrayOfArticles = []
      $('a.feed-post-link.gui-color-primary.gui-color-hover', webData).each(function () {
        const url = $(this).attr('href')
        const titleOfArticle = $(this).text()
        arrayOfArticles.push({
          title: titleOfArticle,
          url
        })
      })
      return response.json(arrayOfArticles)
    } catch (error) {
      throw new Error(error)
    }
  }
}
