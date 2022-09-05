import { createRouter } from "./context";

type Stats = {
  uniques: string;
  date: string;
};

export const uniquesThisMonth = createRouter().query("getUniqueVisitors", {
  resolve() {
    const totalUniques = async () => {
      const res = await fetch(
        "https://api.usefathom.com/v1/aggregations?entity=pageview&entity_id=IMKYNEVQ&aggregates=uniques&date_grouping=month&sort_by=timestamp:desc",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${process.env.FATHOM_TOKEN}` },
        }
      );

      const uniques: Stats[] = await res.json();

      return uniques?.length > 0 ? uniques[0] : null;
    };
    return totalUniques();
  },
});
