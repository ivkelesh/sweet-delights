"use client";

import type { Metadata } from "next";
import "./globals.scss";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/styles/Theme/theme";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, legacy_createStore } from "redux";
import watchSagas from "@/store/sagas/sagas";
import reducer from "@/store/reducers/reducer";
import NavBar from "@/components/Navbar/NavBar";

// export const metadata: Metadata = {
//   title: "Sweet Delights",
//   description: "Sweet Delights Constructor App",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redux
  const sagaMiddleware = createSagaMiddleware();
  const store = legacy_createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(watchSagas);

  // Authenticaton
  const storeState = store.getState();
  const loginState = storeState.isLoggedIn;

  return (
    <html>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <header>
              <NavBar isLoggedIn={loginState} />
            </header>
            <CssBaseline />
            <main>{children}</main>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
