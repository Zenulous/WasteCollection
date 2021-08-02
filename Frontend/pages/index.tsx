import { PrimaryButton, TextField } from "@fluentui/react";
import Head from "next/head";
import React from "react";
import { Flex } from "../components/Flex";
import { WasteApiConnector } from "../connector/WasteApiConnector";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WasteSchedules } from "./_app";
import { ContentContainer } from "../components/ContentContainer";
import { Title } from "../components/Title";
export default function Home() {
  const router = useRouter();
  const { wasteSchedules, setWasteSchedules } =
    React.useContext(WasteSchedules);
  const [postalCode, setPostalCode] = React.useState("");
  const handleSubmit = async () => {
    try {
      const wasteSchedules = await WasteApiConnector.retrieveWasteSchedules(
        postalCode
      );
      setWasteSchedules(wasteSchedules);
      console.log(wasteSchedules);
      if (wasteSchedules.length === 0) {
        toast("There are no waste streams available for this postal code", {
          type: "warning",
        });
        return;
      }
      router.push("schedule");
    } catch {
      toast(
        "Your postal code is invalid. It must be in format XXXX, such as 2353.",
        { type: "error" }
      );
    }
  };
  return (
    <ContentContainer>
      <Head>
        <title>Waste Collection Demo</title>
      </Head>
      <ToastContainer />

      <Title>Welcome to the Waste Collection Demo</Title>
      <form onSubmit={handleSubmit}>
        <Flex flexDirection="row" alignItems="flex-end">
          <TextField
            width="40%"
            label="Enter your postal code (XXXX format)"
            onChange={event => {
              setPostalCode(event.currentTarget.value);
            }}
            required
          />
          <PrimaryButton
            text="Submit"
            value={postalCode}
            onClick={handleSubmit}
            disabled={false}
          />
        </Flex>
      </form>
    </ContentContainer>
  );
}
