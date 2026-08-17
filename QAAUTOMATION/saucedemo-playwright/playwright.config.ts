
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    fullyParallel: false,

    //forbidOnly: !!process.env.CI,
    // reuseExistingServer: !process.env.CI,

    workers: 1,

    reporter: 'html',

    use: {
        testIdAttribute :'testData',
        baseURL: 'https://www.saucedemo.com',

        trace: 'on-first-retry',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        headless: true,
        actionTimeout:10_000,
        navigationTimeout:30_000,
    },

    

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    

    //{
      //name: 'webkit',
      //use: { ...devices['Desktop Safari'] },
    //},

    

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
