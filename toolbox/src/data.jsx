export const mathsTools = {
    displayName: 'Maths',
    tools: {
        'latex-converter': 'LaTeX Converter'
    },
    subCategories: {
        differentiation: {
            displayName: 'Differentiation',
            tools: {
                'stationary-points': 'Stationary points'
            },
            subCategories:  {
                estimation: {
                    displayName: 'Estimation techniques',
                    tools: {
                        'trapezoidal-rule': 'Trapezoidal rule',
                        'simpsons-rule': "Simpson's rule"
                    },
                    subCategories: {
                        TEMPORARY: {
                            displayName: 'Temporary',
                            tools: null,
                            subCategories: null
                        }
                    }
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
                    tools: null,
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
                    tools: null,
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
                    tools: null,
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
                    tools: null,
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
                    tools: null,
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