import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./context/AuthContext";
import { Light, Dark } from "./styles/theme";
import { MyRoutes } from "./routers/routes";
import { ThemeContext } from "./hooks/ThemeContext";
import { useUsersStore } from "./store/UsersStore";

function App() {
  const { dataUsuario } = useUsersStore();
  const theme = dataUsuario?.tema === "0" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;

  return (
    <>
      <ThemeContext.Provider value={{ theme }}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            <MyRoutes />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
