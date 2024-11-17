class Option {
    constructor(content, id) {
        this.content = content;
        this.id = id;
        this.voters = [];
        this.pros = new Map();
        this.cons = new Map();
    }

    toJSON() {
        return {
            content: this.content,
            id: this.id,
            voters: this.voters,
            pros: Array.from(this.pros).map(([participant, pro]) => ({participant, pro})),
            cons: Array.from(this.cons).map(([participant, con]) => ({participant, con})),
        };
    }
}

export default Option;