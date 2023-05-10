export const mathsTools = {
    displayName: 'maths',
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
                subcategories: null
            }
        }
    }
}

export const tools = {
    subjects: {
        maths: mathsTools
    }
}