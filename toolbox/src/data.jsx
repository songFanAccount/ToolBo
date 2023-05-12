export const mathsTools = {
    displayName: 'Maths',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'MathCategory 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'MathCategory11',
                    tools: ["Math C11 T1", "Math C11 T2"],
                    subCategories: null
                }
            }
        }
    }
}

export const chemistryTools = {
    displayName: 'Chemistry',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'ChemCategory 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'ChemCategory11',
                    tools: ["Chem C11 T1", "Chem C11 T2"],
                    subCategories: null
                }
            }
        }
    }
}
export const physicsTools = {
    displayName: 'Physics',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'PhysicsCategory 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'PhysicsCategory11',
                    path: 'pc11',
                    tools: ["Physics C11 T1", "Physics C11 T2"],
                    subCategories: null
                }
            }
        }
    }
}

export const engineeringTools = {
    displayName: 'Engineering',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'EngineeringCategory 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'EngineeringCategory11',
                    tools: ["Engineering C11 T1", "Engineering C11 T2"],
                    subCategories: null
                }
            }
        }
    }
}

export const irlGamesTools = {
    displayName: 'IRL Games',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'IRL Games Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'IRL Games Category11',
                    tools: ["IRL Games  C11 T1", "IRL Games  C11 T2"],
                    subCategories: null
                }
            }
        }
    }
}

export const videoGamesTools = {
    displayName: 'Video Games',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'Video Games Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'Video Games Category11',
                    tools: ["Video Games C11 T1", "Video Games C11 T2"],
                    subCategories: null
                }
            }
        }
    }
}

export const tools = {
    subCategories: {
        maths: mathsTools,
        chemistry: chemistryTools,
        physics: physicsTools,
        engineering: engineeringTools,
        irlGames: irlGamesTools,
        videoGames: videoGamesTools
    }
}