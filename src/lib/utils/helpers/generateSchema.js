export const generateSchema = (type, data) => {
    switch (type) {
        case 'training':
            return {
                '@context': 'https://schema.org',
                '@type': 'Training',
                name: data.name,
                description: data.description,
            };

        default:
            return null;
    }
};