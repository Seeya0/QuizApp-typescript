export const shuffleArray = (array: string[] | number[]) =>
    [...array].sort(() => Math.random() - 0.5);