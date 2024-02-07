import { createContext, useEffect, useState } from "react";

const pageConext = createContext();

function PageContextProvider({ children }) {
  const windowWidth = useWindowWidth();

  const [isLoading, setIsLoading] = useState(false);

  const [[msgType, msgContent], setMsg] = useState(["", ""]);

  const isMobile = isMobileScreen(windowWidth);

  return (
    <pageConext.Provider
      value={{
        screen: { width: windowWidth, isMobile },
        alertMsg: { type: msgType, content: msgContent, setMsg },
        loading: { value: isLoading, setLoading: setIsLoading },
      }}
    >
      {children}
    </pageConext.Provider>
  );
}

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleScreenResize(e) {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleScreenResize);

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, []);

  return windowWidth;
}

function isMobileScreen(size) {
  if (size <= 767) return true;
  else return false;
}

export { pageConext, PageContextProvider };
