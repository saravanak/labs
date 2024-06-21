declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_KEY: string;
        DATABASE_URL: string;
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
        JOB_DATABASE_URL: string
      }
    }    
  }
  
  export {};