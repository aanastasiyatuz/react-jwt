import MyRoutes from './Routes';
import MainContextProvider from './contexts/MainContext';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <MainContextProvider>
          <MyRoutes />
        </MainContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
