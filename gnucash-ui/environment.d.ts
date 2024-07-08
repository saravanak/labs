declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_KEY: string;
        DATABASE_URL: string;
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
        JOB_DATABASE_URL: string
        CYPRESS_TESTING_E2E:string;
        ENABLE_QUERY_LOGS:string;
      }
    }    
  }
  
  export {};