import Problem from "../models/problem";

const generateProblems = () => {
    // Problem 1
    const problem1 = new Problem(
        "Mighty Narwhal",
        "Pick a restaurant for team launch on Friday"
    );
    problem1.addParticipants([
        "Cheerful Otter",
        "Gentle Tiger",
        "Curious Owl",
        "Lazy Koala",
        "Hungry Panda",
    ]);
    problem1.addOptions([
        "The Italian Bistro",
        "Sushi Central",
        "BBQ Haven",
        "Vegan Delight",
        "The Seafood Shack",
        "Mexican Fiesta",
    ]);
    problem1.completeWithRandomResponses("Cheerful Otter");
    problem1.completeWithRandomResponses("Lazy Koala");
    // Problem 2
    const problem2 = new Problem("Hungry Panda", "Pick a gift for Jane Doe's retirement");
    problem2.addParticipants([
        "Mighty Narwhal",
        "Friendly Bear",
        "Bold Eagle",
        "Calm Lion",
        "Cheerful Otter",
        "Lazy Koala",
        "Joyful Dolphin",
    ]);
    problem2.addOptions([
        "Customized Watch",
        "Gift Basket with Wine and Chocolates",
        "Personalized Photo Album",
        "Spa Gift Card",
        "Leather Notebook and Pen Set",
    ]);
    problem2.completeWithRandomResponses("Mighty Narwhal");
    problem2.completeWithRandomResponses("Friendly Bear");
    problem2.completeWithRandomResponses("Curious Owl");
    problem2.completeWithRandomResponses("Joyful Dolphin");
    // Problem 3
    const problem3 = new Problem("Hungry Panda", "Pick a date for team's bowling event");
    problem3.addParticipants([
        "Brave Falcon",
        "Natalie Portman",
        "Cheerful Otter",
        "Punctual Rabbit",
        "Serene Swan",
        "Mighty Narwhal",
    ]);
    problem3.addOptions(["Fri.", "Sat.", "Wed.", "Thur.", "Mon."]);
    problem3.completeAllWithRandomResponses();
    // Problem 4
    const problem4 = new Problem(
        "Gentle Tiger",
        "Decide whether the team should release the next software version next month"
    );
    problem4.addParticipants(["Hungry Panda", "Cheerful Otter", "Mighty Narwhal"]);
    problem4.addOptions(["Yes", "No"]);
    problem4.completeAllWithRandomResponses();
    // Problem 5
    const problem5 = new Problem(
        "Happy Dolphin",
        "Choose a theme for the company's annual gala"
    );
    problem5.addParticipants([
        "Fierce Leopard",
        "Bruce Wayne",
        "Cheerful Otter",
        "Lazy Koala",
        "Hungry Panda",
        "Punctual Rabbit",
        "Mighty Narwhal",
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
