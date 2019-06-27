import { Sequelize } from 'sequelize-typescript';
import { Client } from 'discord.js';
import * as fs from 'fs';
import { configure, getLogger, Logger } from 'log4js';
import Utils from './lib/Utils';

class App {
  private sequelize: Sequelize;
  private discord: Client;
  private log: Logger;

  public async init() {
    await this.setupLogger();
    await this.setupDb();
    this.log.info('Starting the bot...');
    try {
      await this.setupDiscord();
      await Utils.sleep(100);
      this.log.info('Moondrive bot is running!');
    } catch (e) {
      this.log.error(e);
    }
  }

  private async setupDb() {
    this.sequelize = await new Sequelize({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      database: process.env.DB_NAME,
      dialect: 'mysql',
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      models: [`${__dirname}/models`],
      logging: process.env.NODE_ENV === 'development',
    }).sync();
  }

  private async setupLogger() {
    try {
      fs.mkdirSync('../log');
    } catch (e) {
      if (e.code !== 'EEXIST') {
        console.error('Could not set up log directory, error was: ', e);
        process.exit(1);
      }
    }

    configure('./log4js.json');
    this.log = getLogger('INDEX');
  }

  private async setupDiscord() {
    this.discord = new Client();
    this.discord.on('ready', () => {
      this.log.info(`Logged in as ${this.discord.user.tag}!`);
    });
    this.log.info('Logging in to Discord...');
    return this.discord.login(process.env.DISCORD_TOKEN);
  }
}

new App().init();
