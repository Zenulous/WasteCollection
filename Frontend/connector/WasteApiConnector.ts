import axios from "axios";
import { Logistic } from "../../Shared/Logistic";
import { Stream } from "../../Shared/Stream";
import { Container } from "../../Shared/Container";
import { PostalCodeSchedule } from "../../Shared/PostalCodeSchedule";
export class WasteApiConnector {
  static baseEndpoint = process.env.NEXT_PUBLIC_WASTE_API_ENDPOINT + "/api/";
  // TODO: shared model
  static async retrieveWasteSchedules(
    postalCode: string
  ): Promise<PostalCodeSchedule[]> {
    return (
      await axios.get(WasteApiConnector.baseEndpoint + "schedules", {
        params: { postalCode },
      })
    ).data;
  }
  static async retrieveLogistics(): Promise<Logistic[]> {
    return (await axios.get(WasteApiConnector.baseEndpoint + "logistics")).data;
  }
  static async retrieveStreams(): Promise<Stream[]> {
    return (await axios.get(WasteApiConnector.baseEndpoint + "streams")).data;
  }
  static async retrieveContainers(): Promise<Container[]> {
    return (await axios.get(WasteApiConnector.baseEndpoint + "containers"))
      .data;
  }
}
