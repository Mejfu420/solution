import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { ThemeProvider } from '@rescui/ui-contexts';

import "./app.css";
import "./styles/base.scss";
import baseStyles from "./styles/base.scss?url";

import Header from "./components/Header/Header.jsx";
// import Footer from "./components/Footer.jsx";

export const links = () => [
  { rel: "icon", type: "image/svg+xml", href: "/images/favicon.svg" },
  { rel: "stylesheet", href: baseStyles },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://resources.jetbrains.com" />

        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme="dark">
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="global-layout">
      <Header />
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Not Found" : "Error";
    details = error.status === 404 ? "The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again." : error.statusText;
  }

  return (
    <html lang="en">
      <head>
        <title>{error.status === 404 ? `404 ${message}` : message}</title>
      </head>
      <body>
        <main style={{ padding: "2rem" }}>
          <h1>{message}</h1>
          <p>{details}</p>
        </main>
      </body>
    </html>
  );
}