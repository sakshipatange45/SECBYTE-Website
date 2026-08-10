/* ScrollToTop.jsx
   Fixes the common React Router issue where navigating to a new page
   keeps the previous page's scroll position (e.g. if you clicked a
   link while scrolled near the footer, the new page also opens
   scrolled near the bottom instead of at the top).

   HOW TO USE:
   Render this once, inside your <BrowserRouter>, anywhere in the tree
   (it renders nothing). It just watches the route and scrolls up
   whenever the path changes.

   In App.jsx:
     import { BrowserRouter } from "react-router-dom";
     import ScrollToTop from "./components/ScrollToTop";

     function App() {
       return (
         <BrowserRouter>
           <ScrollToTop />
           <Navbar />
           <Routes>...</Routes>
           <Footer />
         </BrowserRouter>
       );
     }
*/
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Some browsers try to remember/restore scroll position on their own
  // during SPA navigations, which can silently fight with our manual
  // scrollTo below. Turning that off once, on mount, makes sure our
  // reset always wins.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // useLayoutEffect runs before the browser paints, so the jump to the
  // top happens before the user sees the new page — avoids any visible
  // flash of the old scroll position on the new route.
  useLayoutEffect(() => {
    console.log("ScrollToTop RUNNING, pathname:", pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}