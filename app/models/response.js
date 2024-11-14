class Response {
    constructor(author, selectedOption, rationale) {
        this.author = author;
        this.selectedOption = selectedOption;
        this.rationale = rationale;
    }

    toJSON() {
        return {
            author: this.author,
            selectedOption: this.selectedOption,
            rationale: this.rationale,
        };
    }
}

export default Response;