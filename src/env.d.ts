
interface ImportMetaEnv {
  VITE_DATABASE: string;
  VITE_DATABASE_SERVE_1:string;
  VITE_DATABASE_SERVE_2:string;
  VITE_SECERT_CRYPTO_KEY:string
  readonly VITE_APP_TITLE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
