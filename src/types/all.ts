export type BaseHotTake = {
    full_name: string;
    hot_take_game: string;
    hot_take: string;
};

export interface FullHotTake extends BaseHotTake{
    created_at: string;
    id: string;
}


type VoteInput = {
    hot_take: string;
    full_name: string;
}


export type BaseVote = {
    hot_take: string;
    hot_take_game: string;
    full_name_guess: string;
    full_name_voter: string;
};


export interface FullVote extends BaseVote{
    created_at: string;
    id: string;
}

export type SubmitVotes = {
    full_name: string;
    hot_take_game: string;
    votes: Array<VoteInput>;
};

export type HotTakes = {
    full_names: Array<string>;
    hot_takes: Array<string>;
}

export type HotTakeReturnType = {
    full_names: Array<string>;
    hot_takes: Array<FullHotTake>;
}


export type Guesser = {
    full_name: string,
    correct_count: number
}

export type Guessers = Array<Guesser>
