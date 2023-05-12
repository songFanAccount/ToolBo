export const mathsTools = {
    displayName: 'Maths',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'Math Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'Math Category 11',
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
            displayName: 'Chem Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'Chem Category 11',
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
            displayName: 'Physics Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'Physics Category 11',
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
            displayName: 'Engineering Category 1',
            tools: null,
            subCategories:  {
                TEMPORARY: {
                    displayName: 'Engineering Category 11',
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
                    displayName: 'IRL Games Category  11',
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
                    displayName: 'Video Games Category 11',
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