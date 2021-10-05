/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import { uuid } from 'uuidv4'
import path from 'path'

export class WebScreperPupperteer {
  constructor() {

  }

  async execute(request: Request, response: Response): Promise<any> {
    const urlToGet = 'https://g1.globo.com/mg/minas-gerais/'
    const imageId = uuid()
    try {
      const browser = await puppeteer.launch({ headless: false })
      const page = await browser.newPage()
      await page.goto(urlToGet)
      await page.click('button.cookie-banner-lgpd_accept-button', {
        delay: 1500
      })
      await page.click('div.load-more.gui-color-primary-bg', {
        delay: 2500
      })
      await page.click('div.load-more.gui-color-primary-bg', {
        delay: 2500
      })
      // await ElementHandle
      await page.screenshot({
        path: path.resolve(__dirname, '..', 'images', `image-${imageId}.png`),
        fullPage: true
      })
      await browser.close()
      return response.send('Rodou!')
    } catch (error) {
      throw new Error(error)
    }
  }
}
