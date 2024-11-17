class Response {
    constructor(author, selectedOption) {
        this.author = author;
        this.selectedOption = selectedOption;
    }

    toJSON() {
        return {
            author: this.author,
            selectedOption: this.selectedOption
        };
    }
}

export default Response;