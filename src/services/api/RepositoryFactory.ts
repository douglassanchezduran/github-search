import createGithub from './githubRepo';

const repositories: any = {
  github: createGithub('/search/repositories'),
};

export const RepositoryFactory = {
  get: (name: string) => repositories[name],
};