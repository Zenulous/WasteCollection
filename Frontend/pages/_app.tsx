import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { PostalCodeSchedule } from "../../Shared";

export const WasteSchedules = React.createContext({
  wasteSchedules: [{}] as PostalCodeSchedule[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setWasteSchedules: (wasteSchedules: PostalCodeSchedule[]) => {
    return;
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  const [wasteSchedules, setWasteSchedules] = useState<PostalCodeSchedule[]>(
    []
  );
  return (
    <WasteSchedules.Provider value={{ wasteSchedules, setWasteSchedules }}>
      <Component {...pageProps} />
    </WasteSchedules.Provider>
  );
}
export default MyApp;
