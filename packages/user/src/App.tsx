import { DBConfig } from "./hooks/DBConfig";
import AppRouter from "./router";
import { initDB } from "react-indexed-db-hook";

initDB(DBConfig);

function App() {
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
