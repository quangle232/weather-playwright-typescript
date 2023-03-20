import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

async function globalSetup(config: FullConfig) {
  // Handle environment config
  if (process.env.test_env) {
    dotenv.config({
      path: `./environments/.env.${process.env.test_env}`,
      override: true
    })
  }
}

export default globalSetup;