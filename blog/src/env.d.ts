// .env data type declare

declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_API_URL: string;
    readonly REACT_APP_STYLE_HOME_SEARCH: string;
    readonly REACT_APP_STYLE_WRITING_SEARCH: string;
  }
}