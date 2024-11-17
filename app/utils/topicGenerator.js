import Topic from "../models/topic";

const generateTopics = () => {
    // Topic 1
    const topic1 = new Topic(
        "Mighty Narwhal",
        "Pick a restaurant for team launch on Friday"
    );
    topic1.addParticipants([
        "Cheerful Otter",
        "Gentle Tiger",
        "Curious Owl",
        "Lazy Koala",
        "Hungry Panda",
    ]);
    topic1.addOptions([
        "The Italian Bistro",
        "Sushi Central",
        "BBQ Haven",
        "Vegan Delight",
        "The Seafood Shack",
        "Mexican Fiesta",
    ]);
    topic1.completeAllWithRandomResponses();
    topic1.generatePros();
    topic1.generateCons();
    // Topic 2
    const topic2 = new Topic("Hungry Panda", "Pick a gift for Jane Doe's retirement");
    topic2.addParticipants([
        "Mighty Narwhal",
        "Friendly Bear",
        "Bold Eagle",
        "Calm Lion",
        "Cheerful Otter",
        "Lazy Koala",
        "Joyful Dolphin",
    ]);
    topic2.addOptions([
        "Customized Watch",
        "Gift Basket with Wine and Chocolates",
        "Personalized Photo Album",
        "Spa Gift Card",
        "Leather Notebook and Pen Set",
    ]);
    topic2.completeWithRandomResponses("Mighty Narwhal");
    topic2.completeWithRandomResponses("Friendly Bear");
    topic2.completeWithRandomResponses("Curious Owl");
    topic2.completeWithRandomResponses("Joyful Dolphin");
    topic2.generatePros();
    topic2.generateCons();
    // Topic 3
    const topic3 = new Topic("Hungry Panda", "Pick a date for team's bowling event");
    topic3.addParticipants([
        "Brave Falcon",
        "Natalie Portman",
        "Cheerful Otter",
        "Punctual Rabbit",
        "Serene Swan",
        "Mighty Narwhal",
    ]);
    topic3.addOptions(["Fri.", "Sat.", "Wed.", "Thur.", "Mon."]);
    topic3.completeAllWithRandomResponses();
    topic3.generatePros();
    topic3.generateCons();
    topic3.generateFinalDecision();
    // Topic 4
    const topic4 = new Topic(
        "Gentle Tiger",
        "Decide whether the team should release the next software version next month"
    );
    topic4.addParticipants(["Hungry Panda", "Cheerful Otter", "Mighty Narwhal"]);
    topic4.addOptions(["Yes", "No"]);
    topic4.completeAllWithRandomResponses();
    topic4.generatePros();
    topic4.generateCons();
    topic4.generateFinalDecision();
    // Topic 5
    const topic5 = new Topic(
        "Happy Dolphin",
        "Choose a theme for the company's annual gala"
    );
    topic5.addParticipants([
        "Fierce Leopard",
        "Bruce Wayne",
        "Cheerful Otter",
        "Lazy Koala",
        "Hungry Panda",
        "Punctual Rabbit",
        "Mighty Narwhal",
    ]);
    topic5.addOptions([
        "Masquerade Ball",
        "Hollywood Glamour",
        "Casino Night",
        "Winter Wonderland",
    ]);
    topic5.completeAllWithRandomResponses();
    topic5.generatePros();
    topic5.generateCons();
    topic5.generateFinalDecision();

    const openTopics = [topic1, topic2];
    const closedTopics = [topic3, topic4, topic5];

    return [openTopics, closedTopics];
};

export default generateTopics;
