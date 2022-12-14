import { PointTypes, ScoreTypes, UserTypes } from "../types";

export const userFetcher = async (...args: any[]) => {
  const [url, query] = args;

 
  const [name, value] = query.split(" ");

  const res = await fetch(`${url}?${name}=${query}`);

  
  const data = await res.json();

  // console.log(data)

  const users: UserTypes[] = data.users;

  return users;
};

export const pointFetcher = async (...args: any[]) => {
  //TODO: implement the right query param name to send to backend
  // console.log(...args)
  const [url, query] = args;

  // console.log('This is url:',url);

  // console.log('This is query:',query);
  const [name, value] = query.split(" ");

  const res = await fetch(`${url}?${name}=${query}`);

  const data = await res.json();

  const points: PointTypes[] = data.points;

  return points;
};

export const myPointFetcher = async (...args: any[]) => {
  //TODO: implement the right query param name to send to backend
  // console.log(...args)
  const [url, query] = args;

  // console.log('This is url:',url);

  // console.log('This is query:',query);
  const [name, value] = query.split(" ");

  const res = await fetch(`${url}?${name}=${query}`);

  const data = await res.json();

  const points: PointTypes[] = data.points;

  return points;
};

export const scoreFetcher = async () => {
  const res = await fetch("/api/scores/getScores");

  const data = await res.json();

  const scores: ScoreTypes[] = data.scores;

  return scores;
};
