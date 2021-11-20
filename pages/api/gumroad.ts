import Big from 'big.js';

const getProductSales = async (id) => {
  const response = await fetch(`https://api.gumroad.com/v2/products/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.GUMROAD_API_KEY}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });

  const { product } = await response.json();

  return new Big(product.sales_usd_cents).div(100);
};

export default async (_, res) => {
  const ric = await getProductSales('iYQx');
  const rpw = await getProductSales('gdTD');
  const evergreen = await getProductSales('qaxYX');

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res.status(200).json({
    sales: ric.plus(rpw).plus(evergreen).toFixed(0)
  });
};
