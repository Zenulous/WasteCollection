import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import { PostalCodeSchedule } from "../../Shared/PostalCodeSchedule";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
`;
export const WasteSchedules = React.createContext({
  wasteSchedules: [{}] as PostalCodeSchedule[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setWasteSchedules: (wasteSchedules: PostalCodeSchedule[]) => {
    return;
  },
});
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [loaded, setLoaded] = React.useState(false);
  const [wasteSchedules, setWasteSchedules] = useState<PostalCodeSchedule[]>(
    []
  );
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <WasteSchedules.Provider value={{ wasteSchedules, setWasteSchedules }}>
      <GlobalStyle> </GlobalStyle>
      {loaded ? <Component {...pageProps} /> : "Loading..."}
    </WasteSchedules.Provider>
  );
}
export default MyApp;
