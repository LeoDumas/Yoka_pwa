export function getNutriScoreColor(grade: string) {
    switch (grade) {
        case 'a':
            return 'text-green-500';
        case 'b':
            return 'text-green-400';
        case 'c':
            return 'text-yellow-500';
        case 'd':
            return 'text-orange-500';
        case 'e':
            return 'text-red-500';
        default:
            return 'text-gray-500';
    }
}

export function getScoreColor(score: number) {
    if (score >= 75) {
        return 'text-green-500';
    } else if (score >= 50) {
        return 'text-yellow-500';
    } else if (score >= 35) {
        return 'text-orange-500';
    } else {
        return 'text-red-500';
    }
}