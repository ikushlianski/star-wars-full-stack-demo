import axios from 'axios';

export class DataFetcher {
  // hardcoded for simplicity. We could fetch API's "pages" in batches of 5-10 and look at "next" link in each result to see whether we should stop
  PAGE_COUNT = 9;
  BASE_URL = process.env.SW_API_BASE_URL;

  public fetchData = async <T>(urls: string[]): Promise<T[]> => {
    const requests = urls.map((url) => {
      return axios.get(url);
    });

    const results = await Promise.all(requests);

    return results.map((result) => result.data);
  };

  public getPageUrls = (): string[] => {
    const { pages } = new Array(this.PAGE_COUNT).fill(1).reduce(
      (acc, cur) => {
        acc.pages.push(`${this.BASE_URL}?page=${cur + acc.counter}`);

        acc.counter += 1;

        return acc;
      },
      { counter: 0, pages: [] },
    );

    return pages;
  };
}

export const dataFetcher = new DataFetcher();
