// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import del from 'del'
import mkdirp from 'mkdirp'
import { join } from 'path'
import { expect } from 'chai'

import {
  Cron,
  PopApiScraper
} from '../src/'

/** @test {Cron} */
describe('Cron', () => {
  /**
   * The Cron object to test.
   * @type {Cron}
   */
  let cron: Cron

  /**
   * The PopApi mock object.
   * @type {Object}
   */
  let PopApi: Object

  /**
   * The temporary directory to store the status and updated files.
   * @type {string}
   */
  let tempDir: string

  /**
   * Hook for setting up the Cron tests.
   * @type {Function}
   */
  before(() => {
    tempDir = join(...[
      __dirname,
      '..',
      'tmp'
    ])
    del.sync([tempDir])
    mkdirp.sync(tempDir)

    const scraper = new PopApiScraper({}, {
      statusPath: join(...[tempDir, 'status.json']),
      updatedPath: join(...[tempDir, 'updated.json'])
    })

    PopApi = { scraper }
    cron = new Cron(PopApi)
  })

  /** @test {Context#constructor} */
  it('should test the constructor with options.', () => {
    new Cron(PopApi, { // eslint-disable-line no-new
      cronTime: '0 0 */6 * * *'
    })
  })

  /** @test {Corn#constructor} */
  it('should check the attributes of the Cron', () => {
    expect(cron.cronTime).to.exist
    expect(cron.cronTime).to.be.a('string')
  })

  /** @test {Cron#getCron} */
  it('should get the cron object', () => {
    const res = cron.getCron(PopApi)
    expect(res).to.be.an('object')
  })

  /**
   * Hook for tearing down the Cron tests.
   * @type {Function}
   */
  after(() => {
    del.sync(tempDir)
  })
})
