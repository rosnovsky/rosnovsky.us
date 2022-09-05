// import fetcher from "../../utils/fetcher";
// import useSWR from "swr";
import { createRouter } from "./context";
import { Status } from "../..";

export const status = createRouter().query("getStatus", {
  async resolve() {
    const getStatus = async () => {
      const status = await fetch(
        "https://betteruptime.com/api/v2/monitor-groups/26889/monitors",
        {
          headers: { Authorization: `Bearer ${process.env.STATUS}` },
        }
      ).then((result) => result.json());

      return status;
    };
    const result = await getStatus();
    const status: { monitor: string; status: string }[] = result.data.map(
      (item: any) => {
        return {
          monitor: item.attributes.pronounceable_name,
          status: item.attributes.status,
        };
      }
    );
    return status;
  },
});
