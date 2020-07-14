import Repository from './Repository';

export default (resource: string) => ({
  search(query = '') {
    return Repository.get(`${resource}${query}`);
  },
});
