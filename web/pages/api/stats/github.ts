const github = async (_, res) => {
  // NOTE: Authorized requests have rate limit of 5000 requests per hour.
  const userResponse = await fetch('https://api.github.com/users/rosnovsky', {
    headers: {
      Authorization: 'token ' + process.env.GH_TOKEN,
    },
  });
  const userReposResponse = await fetch(
    'https://api.github.com/users/rosnovsky/repos?per_page=100',
    {
      headers: {
        Authorization: 'token ' + process.env.GH_TOKEN,
      },
    }
  );

  const user = await userResponse.json();
  const repositories = await userReposResponse.json();

  const mine = repositories.filter((repo) => !repo.fork);
  const stars = mine.reduce((accumulator, repository) => {
    return accumulator + repository['stargazers_count'];
  }, 0);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res.status(200).json({
    followers: user.followers,
    stars,
  });
};

export default github;
