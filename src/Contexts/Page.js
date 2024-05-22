import { createContext, useEffect, useState } from "react";

const pageContext = createContext();

function PageContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const [[msgType, msgContent], setMsg] = useState(["", ""]);

  const isMobile = isMobileScreen(window.innerWidth);

  return (
    <pageContext.Provider
      value={{
        screen: { isMobile },
        alertMsg: { type: msgType, content: msgContent, setMsg },
        loading: { value: isLoading, setLoading: setIsLoading },
      }}
    >
      {children}
    </pageContext.Provider>
  );
}

function isMobileScreen(size) {
  if (size <= 767) return true;
  else return false;
}

export { pageContext, PageContextProvider };
