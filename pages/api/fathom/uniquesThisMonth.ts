const fathom = async (req, res) => {
  const totalUniques = await fetch(
    'https://api.usefathom.com/v1/aggregations?entity=pageview&entity_id=IMKYNEVQ&aggregates=uniques&date_grouping=month&sort_by=timestamp:desc',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.FATHOM_TOKEN}` }
    }
  );

  const uniques: Record<string, string>[] = await totalUniques.json();
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=6000'
  );

  return res.status(200).json({
    uniques: uniques[0].uniques
  });
};

export default fathom;
