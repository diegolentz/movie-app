import { LoaderProvider } from "./context/useLoader"
import { AppRouter } from "./routes"

function App() {

  return (
    <>
    <LoaderProvider>
      <AppRouter />
    </LoaderProvider>
    </>
  )
}

export default App
