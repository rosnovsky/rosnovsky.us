const github = async (_, res) => {
  const userResponse = await fetch('https://api.github.com/users/rosnovsky');
  const userReposResponse = await fetch(
    'https://api.github.com/users/rosnovsky/repos?per_page=100'
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
    stars
  });
};

export default github;
