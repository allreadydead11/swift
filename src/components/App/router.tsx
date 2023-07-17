import { useEffect } from "react";
import { Outlet, createBrowserRouter, redirect, useLocation } from "react-router-dom";

import { CLIENT_ROUTES } from "../../constants";
import PageWrapper from "./../PageWrapper/index";

import Home from "../../pages/Home";
import About from "../../pages/About";
import Finance from "../../pages/Finance";
import Profile from "../../pages/Profile";
import Cards from "./../../pages/Cards/index";
import Account from "../../pages/Account.tsx";
import Livechat from "../../pages/Livechat";
import Signin from "../../pages/Signin";
import Signup from "../../pages/Signup";
import Welcome from "../../pages/Welcome";

const ROUTER = createBrowserRouter([
  {
    path: CLIENT_ROUTES.home,
    children: [
      {
        path: CLIENT_ROUTES.home,
        element: (
          <PageWrapper>
            <Home />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.about,
        element: (
          <PageWrapper>
            <About />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.cards,
        element: (
          <PageWrapper>
            <Cards />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.finance,
        element: (
          <PageWrapper>
            <Finance />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.profile,
        element: (
          <PageWrapper>
            <Profile />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.cards,
        element: (
          <PageWrapper>
            <Cards />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.account,
        element: (
          <PageWrapper>
            <Account />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.liveChat,
        element: (
          <PageWrapper>
            <Livechat />
          </PageWrapper>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Redirect path={CLIENT_ROUTES.auth} />,
    children: [
      {
        path: CLIENT_ROUTES.authWelcome,
        element: (
          <PageWrapper>
            <Welcome />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.authSignin,
        element: (
          <PageWrapper>
            <Signin />
          </PageWrapper>
        ),
      },
      {
        path: CLIENT_ROUTES.authSignup,
        element: (
          <PageWrapper>
            <Signup />
          </PageWrapper>
        ),
      },
    ],
  },
]);

function Redirect({ path }: { path: string }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== path) return;
    redirect(CLIENT_ROUTES.authSignin);
  });

  return <Outlet />;
}

export default ROUTER;
