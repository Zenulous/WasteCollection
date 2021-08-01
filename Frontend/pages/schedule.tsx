import React, { useEffect } from "react";
import { WasteSchedules } from "./_app";
import { Title } from "../components/Title";
import { ContentContainer } from "../components/ContentContainer";
import { WasteApiConnector } from "../connector/WasteApiConnector";
import { Flex } from "../components/Flex";
import { Logistic } from "../../Shared/Logistic";
import { Stream } from "../../Shared/Stream";
import { Container } from "../../Shared/Container";
import { PostalCodeSchedule } from "../../Shared";
export default function Schedule(): JSX.Element {
  const { wasteSchedules } = React.useContext(WasteSchedules);
  const [containers, setContainers] = React.useState<Container[]>([]);
  const [logistics, setLogistics] = React.useState<Logistic[]>([]);
  const [streams, setStreams] = React.useState<Stream[]>([]);
  console.log(wasteSchedules);
  useEffect(() => {
    async function getDisplayData() {
      setContainers(await WasteApiConnector.retrieveContainers());
      setLogistics(await WasteApiConnector.retrieveLogistics());
      setStreams(await WasteApiConnector.retrieveStreams());
    }

    getDisplayData();
  }, []);
  return (
    <ContentContainer>
      {" "}
      <Title>Your available waste streams</Title>
      {visualiseWasteSchedules([
        {
          logisticId: "0",
          supportedWasteStreamIds: [1, 4, 5, 6, 7],
          supportedContainerIds: [1, 4, 5, 6, 7],
          availability: {
            "0": {
              restrictions: null,
              timeslots: [
                {
                  start: "0000-01-01T14:00:00+01:00",
                  end: "0000-01-01T16:00:00+01:00",
                },
              ],
            },
            "1": {
              restrictions: null,
              timeslots: [
                {
                  start: "0000-01-01T14:00:00+01:00",
                  end: "0000-01-01T16:00:00+01:00",
                },
              ],
            },
            "2": {
              restrictions: null,
              timeslots: [
                {
                  start: "0000-01-01T14:00:00+01:00",
                  end: "0000-01-01T16:00:00+01:00",
                },
              ],
            },
            "3": {
              restrictions: null,
              timeslots: [
                {
                  start: "0000-01-01T14:00:00+01:00",
                  end: "0000-01-01T16:00:00+01:00",
                },
              ],
            },
            "4": null,
            "5": null,
            "6": null,
          },
        },
        {
          logisticId: "1",
          supportedWasteStreamIds: [1, 2, 3],
          supportedContainerIds: [1, 2, 3],
          availability: {
            "0": {
              restrictions: null,
              timeslots: [
                {
                  start: "0000-01-01T14:00:00+01:00",
                  end: "0000-01-01T16:00:00+01:00",
                },
              ],
            },
            "1": null,
            "2": {
              restrictions: null,
              timeslots: [
                {
                  start: "0000-01-01T14:00:00+01:00",
                  end: "0000-01-01T16:00:00+01:00",
                },
              ],
            },
            "3": null,
            "4": {
              restrictions: [
                {
                  type: 0,
                  value: 2,
                },
              ],
              timeslots: [
                {
                  start: "0000-01-01T08:00:00+01:00",
                  end: "0000-01-01T10:00:00+01:00",
                },
              ],
            },
            "5": null,
            "6": null,
          },
        },
      ])}
    </ContentContainer>
  );
  function visualiseWasteSchedules(wasteSchedules: PostalCodeSchedule[]) {
    const supportedWasteStreamIds: any[] = [];
    for (const schedule of wasteSchedules) {
      for (const streamId of schedule.supportedWasteStreamIds) {
        if (!supportedWasteStreamIds.includes(streamId)) {
          supportedWasteStreamIds.push(streamId);
        }
      }
    }

    return (
      <Flex width="70%" flexDirection="row" justifyContent="space-between">
        {wasteSchedules.map(schedule => {
          const logistic = logistics.find(
            (logistic: Logistic) => schedule.logisticId === logistic.id
          );
          return (
            // eslint-disable-next-line react/jsx-key
            <div>
              <div>Logistic provider name: {logistic?.name["en-gb"]}</div>
              <div>
                Supported waste streams:{" "}
                {schedule.supportedWasteStreamIds.map(streamId => {
                  return (
                    <p>
                      {streams.find(stream => {
                        return stream.streamProductId === streamId;
                      })?.name["en-gb"] || streamId + "unknown"}
                    </p>
                  );
                })}
              </div>
              <div>
                Available timeslots: <br></br>
                {`Monday ${schedule.availability[0] || "no"}`}
                <br></br>
                {`Tuesday ${schedule.availability[1] || "no"}`}
                <br></br>
                {`Wednesday ${schedule.availability[2] || "no"}`}
                <br></br>
                {`Thursday ${schedule.availability[3] || "no"}`}
                <br></br>
                {`Friday ${schedule.availability[4] || "no"}`}
                <br></br>
                {`Saturday ${schedule.availability[5] || "no"}`}
                <br></br>
                {`Sunday ${schedule.availability[6] || "no"}`}
              </div>
            </div>
          );
        })}
      </Flex>
    );
  }
}
