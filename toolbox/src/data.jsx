export const mathsTools = {
    displayName: 'Maths',
    path: 'maths',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'MathCategory 1',
            path: 'mc1',
            tools: null,
            subCategories:  {
                displayName: 'MathCategory11',
                path: 'mc11',
                tools: ["Math C11 T1", "Math C11 T2"],
                subCategories: null
            }
        }
    }
}

export const chemistryTools = {
    displayName: 'Chemistry',
    path: 'chemistry',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'ChemCategory 1',
            path: 'cc1',
            tools: null,
            subCategories:  {
                displayName: 'ChemCategory11',
                path: 'cc11',
                tools: ["Chem C11 T1", "Chem C11 T2"],
                subCategories: null
            }
        }
    }
}
export const physicsTools = {
    displayName: 'Physics',
    path: 'physics',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'PhysicsCategory 1',
            path: 'pc1',
            tools: null,
            subCategories:  {
                displayName: 'PhysicsCategory11',
                path: 'pc11',
                tools: ["Physics C11 T1", "Physics C11 T2"],
                subCategories: null
            }
        }
    }
}

export const engineeringTools = {
    displayName: 'Engineering',
    path: 'engineering',
    tools: null,
    subCategories: {
        integration: {
            displayName: 'EngineeringCategory 1',
            path: 'ec1',
            tools: null,
            subCategories:  {
                displayName: 'EngineeringCategory11',
                path: 'ec11',
                tools: ["Engineering C11 T1", "Engineering C11 T2"],
                subCategories: null
            }
        }
    }
}

export const tools = {
    subjects: {
        Maths: mathsTools,
        Chemistry: chemistryTools,
        Physics: physicsTools,
        Engineering: engineeringTools
    }
}