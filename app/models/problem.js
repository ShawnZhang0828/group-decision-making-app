import Option from "./option";
import Response from "./response";

class Problem {
    constructor(creator, description) {
        this.creator = creator;
        this.description = description;
        this.createdDate = this.getCurrentDate();

        this.options = [];
        this.participants = new Map();
        this.responses = new Map();
    }

    addParticipant(participant) {
        this.participants.set(participant, false);
        this.responses.set(participant, null);
    }

    addParticipants(participants) {
        participants.forEach(participant => {
            this.addParticipant(participant);
        });
    }

    addOption(option) {
        // id of an option starts from 0
        const id = this.options.length;
        this.options.push(new Option(option, id));
    }

    addOptions(options) {
        options.forEach((option) => {
            this.addOption(option);
        })
    }

    completeWithRandomResponses(name) {
        this.participants.set(name, true);
        const randomOption = Math.floor(Math.random() * this.options.size);
        this.responses.set(name, new Response(name, randomOption, 'This is a placeholder for the rationale of this decision. The author of this response should specify the pros and cons for this decision.'))
    }

    completeAllWithRandomResponses() {
        Array.from(this.participants.keys()).forEach((name) => {
            this.completeWithRandomResponses(name);
        })
    }

    getFinalDecision() {
        return this.options.reduce((max, option) => (option.votes > max.votes ? option : max), this.options[0]);
    }

    getProblemCompleted() {
        return Array.from(this.participants.values()).every(value => value);
    }

    getCurrentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        return today;
    }
}

export default Problem;