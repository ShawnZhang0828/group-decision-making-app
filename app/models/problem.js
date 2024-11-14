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
        participants.forEach((participant) => {
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
        });
    }

    // generate a random response from a participant
    completeWithRandomResponses(name) {
        this.participants.set(name, true);
        const randomOption = Math.floor(Math.random() * this.options.length);
        const option = this.options[randomOption];

        this.responses.set(
            name,
            new Response(
                name,
                option,
                "This is a placeholder for the rationale of this decision. The author of this response should specify the pros and cons for this decision."
            )
        );
        option.voters.push(name);
    }

    completeAllWithRandomResponses() {
        Array.from(this.participants.keys()).forEach((name) => {
            this.completeWithRandomResponses(name);
        });
    }

    // get the decision with the largest number of votes
    getFinalDecision() {
        return this.options.reduce(
            (max, option) =>
                option.voters.length > max.voters.length ? option : max,
            this.options[0]
        );
    }

    // get a bool that tells if the decision has been made
    getProblemCompleted() {
        return Array.from(this.participants.values()).every((value) => value);
    }

    getCurrentDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var yyyy = today.getFullYear();

        today = mm + "/" + dd + "/" + yyyy;

        return today;
    }
}

export default Problem;
