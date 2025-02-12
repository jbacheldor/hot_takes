export type BaseHotTake = {
    full_name: string;
    hot_take_game: string;
    hot_take: string;
};

export interface FullHotTake extends BaseHotTake{
    created_at: string;
    id: string;
}


type Vote = {
    hot_take: string;
    full_name: string;
}

export type SubmitVotes = {
    full_name: string;
    hot_take_game: string;
    votes: Array<Vote>;
};

export type HotTakes = {
    full_names: Array<string>;
    hot_takes: Array<string>;
}

export type HotTakeReturnType = {
    full_names: Array<string>;
    hot_takes: Array<FullHotTake>;
}
