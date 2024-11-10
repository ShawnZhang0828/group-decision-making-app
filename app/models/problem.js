import Option from "./option";
import Response from "./response";

class Problem {
    constructor(creator, description) {
        this.creator = creator;
        this.description = description;
        this.options = [];
        this.createdDate = this.getCurrentDate();
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
        this.options.push(option);
    }

    addOptions(options) {
        options.forEach((option) => {
            this.addOption(option);
        })
    }

    completeWithRandomResponses(name) {
        this.participants.set(name, true);
        const randomOption = Math.floor(Math.random() * this.options.length);
        this.responses.set(name, new Response(name, randomOption, 'This is a placeholder for the rationale of this decision. The author of this response should specify the pros and cons for this decision.'))
    }

    completeAllWithRandomResponses() {
        Array.from(this.participants.keys()).forEach((name) => {
            this.completeWithRandomResponses(name);
        })
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