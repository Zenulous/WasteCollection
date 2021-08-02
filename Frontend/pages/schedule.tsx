import React, { useEffect } from "react";
import { WasteSchedules } from "./_app";
import { Title } from "../components/Title";
import { ContentContainer } from "../components/ContentContainer";
import { WasteApiConnector } from "../connector/WasteApiConnector";
import { Flex } from "../components/Flex";
import { Logistic } from "../../Shared/Logistic";
import { Stream } from "../../Shared/Stream";
import { Container } from "../../Shared/Container";
import { Image } from "@fluentui/react";
import {
  Availability,
  PostalCodeSchedule,
} from "../../Shared/PostalCodeSchedule";
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
      {visualiseWasteSchedules(wasteSchedules)}
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
              <div>
                <b>Logistic provider name: {logistic?.name["en-gb"]}</b>
              </div>
              <div>
                <b>Supported waste types: </b>
                {schedule.supportedWasteStreamIds.map(streamId => {
                  const stream = streams.find(stream => {
                    return stream.streamProductId === streamId;
                  });
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <p>
                      {stream ? (
                        <p>
                          <Image
                            width={100}
                            height={100}
                            src={stream.image}
                          ></Image>{" "}
                          {stream.name["en-gb"]}{" "}
                        </p>
                      ) : (
                        streamId +
                        " (unknown waste stream: missing from sample data)"
                      )}
                    </p>
                  );
                })}
              </div>
              <div>
                <b>Supported container types: </b>
                {schedule.supportedContainerIds.map(containerId => {
                  const container = containers.find(container => {
                    return container.containerProductId === containerId;
                  });
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <p>
                      {container
                        ? container.name["en-gb"] +
                          ` (${container?.description["en-gb"]})`
                        : containerId +
                          " (unknown container: missing from sample data)"}
                    </p>
                  );
                })}
              </div>
              <div>
                <b>Available timeslots:</b>
                {parseScheduleAvailability(schedule.availability)}
                <br></br>
              </div>
            </div>
          );
        })}
      </Flex>
    );
  }
}

function parseScheduleAvailability(availability: Availability): JSX.Element {
  const noTimeSlotAvailable = "No timeslot available";
  const rows = [];
  let text = "";
  for (let index = 0; index < 7; index++) {
    text = "";
    if (availability[index]?.restrictions) {
      // Currently there can only be 1 restriction, but this can be extended in the future
      switch (availability[index]?.restrictions![0].type) {
        case 0:
          text = `Available every ${
            availability[index]?.restrictions![0].value
          } weeks from `;
      }
    }
    if (!availability[index]) {
      text += noTimeSlotAvailable;
    } else {
      for (const timeslot of availability[index]!.timeslots) {
        text += " - ";
        const start = new Date(timeslot.start!).getHours();
        const end = new Date(timeslot.end!).getHours();

        text += `${start} to  ${end}`;
      }
    }

    switch (index) {
      case 0:
        text = "Monday " + text;
        break;
      case 1:
        text = "Tuesday " + text;
        break;
      case 2:
        text = "Wednesday " + text;
        break;
      case 3:
        text = "Thursday " + text;
        break;
      case 4:
        text = "Friday " + text;
        break;
      case 5:
        text = "Saturday " + text;
        break;
      case 6:
        text = "Sunday " + text;
        break;
      default:
        break;
    }

    rows.push(text);
    rows.push(<br></br>);
  }

  return <div>{rows}</div>;
}
