export const idGenerator = (() => {
    const generatedIds = new Set();

    return {
        generateUniqueId: () => {
            let id;
            do {
                id = Math.floor(Math.random() * 9000) + 1000;
            } while (generatedIds.has(id));
            generatedIds.add(id); 
            return id;
        }
    };
})();