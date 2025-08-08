export type BaseGame = {
  title: string;
  voting_live_at: string;
  completed_at: string,
};

export interface Game extends BaseGame {
  id: number;
  created_at: string;
  completed_at: string;
}

export type BaseHotTake = {
  full_name: string;
  hot_take_game_id: number;
  hot_take: string;
};

export interface HotTake extends BaseHotTake {
  id: number;
  created_at: string;
}

export type BaseVote = {
  hot_take_id: number;
  hot_take_game_id: number;
  full_name_guess: string;
  full_name_voter: string;
};

export interface Vote extends BaseVote {
  id: number;
  created_at: string;
}

type VoteInput = {
  hot_take_id: number;
  full_name: string;
};

export type SubmitVotes = {
  full_name: string;
  hot_take_game_id: number;
  votes: Array<VoteInput>;
};

export type HotTakeReturnType = {
  full_names: Array<string>;
  hot_takes: Array<HotTake>;
};

export type Guesser = {
  full_name: string;
  correct_count: number;
};

export type Guessers = Array<Guesser>;

export type ResultData = {
  full_name: string;
  hot_take: string;
  percentage: number;
};

export type ResultsContainer = {
  results: ResultData[];
};
