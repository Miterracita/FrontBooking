import { RouterProvider } from 'react-router-dom';
import router from './Router';//archivo creado para identificar las rutas protegidas

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App;
