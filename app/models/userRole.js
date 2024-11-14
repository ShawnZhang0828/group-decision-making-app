export const UserRole = {
    STAKEHOLDER: 0,
    CREATOR: 1,
    PARTICIPANT: 2,
};

export const convertRole = (role) => {
    switch (role) {
        case UserRole.STAKEHOLDER:
            return "Stakeholder";
        case UserRole.CREATOR:
            return "Creator";
        case UserRole.PARTICIPANT:
            return "Participant";
        default:
            return "Unknown Role";
    }

}

