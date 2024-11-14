import Problem from "../models/problem";

const generateProblems = (name) => {
    // Problem 1
    const problem1 = new Problem(
        name,
        "Pick a restaurant for team launch on Friday"
    );
    problem1.addParticipants([
        "Alice Johnson",
        "Bob Smith",
        "Charlie Brown",
        "Diana Prince",
        "Edward Norton",
    ]);
    problem1.addOptions([
        "The Italian Bistro",
        "Sushi Central",
        "BBQ Haven",
        "Vegan Delight",
        "The Seafood Shack",
        "Mexican Fiesta",
    ]);
    problem1.completeWithRandomResponses("Alice Johnson");
    problem1.completeWithRandomResponses("Diana Prince");
    // Problem 2
    const problem2 = new Problem(name, "Pick a gift for Jane Doe's retirement");
    problem2.addParticipants([
        "Fiona Gallagher",
        "George Martin",
        "Helen Mirren",
        "Isaac Newton",
        "Jane Austen",
        "Karl Marx",
        "Laura Croft",
    ]);
    problem2.addOptions([
        "Customized Watch",
        "Gift Basket with Wine and Chocolates",
        "Personalized Photo Album",
        "Spa Gift Card",
        "Leather Notebook and Pen Set",
    ]);
    problem2.completeWithRandomResponses("Fiona Gallagher");
    problem2.completeWithRandomResponses("Helen Mirren");
    problem2.completeWithRandomResponses("Isaac Newton");
    problem2.completeWithRandomResponses("Laura Croft");
    // Problem 3
    const problem3 = new Problem(name, "Pick a date for team's bowling event");
    problem3.addParticipants([
        "Michael Jordan",
        "Natalie Portman",
        "Oprah Winfrey",
        "Peter Parker",
        "Quincy Jones",
        "Rachel Green",
    ]);
    problem3.addOptions(["Fri.", "Sat.", "Wed.", "Thur.", "Mon."]);
    problem3.completeAllWithRandomResponses();
    // Problem 4
    const problem4 = new Problem(
        name,
        "Decide whether the team should release the next software version next month"
    );
    problem4.addParticipants(["Samuel Jackson", "Tony Stark", "Uma Thurman"]);
    problem4.addOptions(["Yes", "No"]);
    problem4.completeAllWithRandomResponses();
    // Problem 5
    const problem5 = new Problem(
        name,
        "Choose a theme for the company's annual gala"
    );
    problem5.addParticipants([
        "Alice Cooper",
        "Bruce Wayne",
        "Clark Kent",
        "Diana Prince",
        "Eleanor Rigby",
        "Frodo Baggins",
        "Gandalf the Grey",
    ]);
    problem5.addOptions([
        "Masquerade Ball",
        "Hollywood Glamour",
        "Casino Night",
        "Winter Wonderland",
    ]);
    problem5.completeAllWithRandomResponses();

    const openProblems = [problem1, problem2];
    const closedProblems = [problem3, problem4, problem5];

    return [openProblems, closedProblems];
};

export default generateProblems;
