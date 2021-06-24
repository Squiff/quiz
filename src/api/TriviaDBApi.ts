/* ----------- TYPES -------------*/
export interface Category {
    id: number;
    name: string;
}

interface CategoryResponse {
    trivia_categories: Category[];
}

export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
}

export interface QuestionResponse {
    response_code: number;
    results: Question[];
}

export type QDifficulty = 'any' | 'easy' | 'medium' | 'hard';
export type QType = 'any' | 'boolean' | 'multiple';

interface questionRequestArgs {
    qcount: number;
    qdifficulty: QDifficulty;
    qtype: QType;
    qcategory: number;
}

/* ----------- CODE -------------*/

const baseUrl = 'https://opentdb.com';

async function getCategories(): Promise<Category[]> {
    const url = new URL(baseUrl);

    url.pathname = 'api_category.php';

    const response = await fetch(url.toString());

    if (response.status < 200 || response.status >= 300) {
        throw Error(response.statusText);
    }

    const res: CategoryResponse = await response.json();

    // return a sorted response with additional "ask anything" category
    const sorted = res.trivia_categories.sort((a, b) => a.name.localeCompare(b.name));
    const askAnyCat = { id: 0, name: 'Ask Me Anything' };
    const catArr = [askAnyCat, ...sorted];

    return catArr;
}

function questionURLBuilder({ qdifficulty, qcount, qtype, qcategory }: questionRequestArgs) {
    const url = new URL(baseUrl);
    url.pathname = 'api.php';
    url.searchParams.append('amount', qcount.toString());

    if (qdifficulty !== 'any') url.searchParams.append('difficulty', qdifficulty);

    if (qtype !== 'any') url.searchParams.append('type', qtype);

    if (qcategory !== 0) url.searchParams.append('category', qcategory.toString());

    return url;
}

async function getQuestions(args: questionRequestArgs) {
    const url = questionURLBuilder(args);
    const response = await fetch(url.toString());

    if (response.status < 200 || response.status >= 300) {
        throw Error(response.statusText);
    }

    const responseJson: QuestionResponse = await response.json();

    validateJsonResponse(responseJson);

    // combine and randomize all answers
    responseJson.results.forEach((q) => {
        q.answers = randomAnswers(q.incorrect_answers, q.correct_answer);
    });

    return responseJson;
}

// return a randomly ordered array of answers
function randomAnswers(incorrectAnswers: string[], correctAnswer: string) {
    const answers = [...incorrectAnswers, correctAnswer];
    return answers.sort((a, b) => 0.5 - Math.random());
}

class APIValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'APIValidationError';
    }
}

function validateJsonResponse(responseJson: QuestionResponse) {
    // Codes 2,3,4 should not occur, but adding here for info
    switch (responseJson.response_code) {
        case 1:
            throw new APIValidationError(
                'There are not enough questions for your search. Please select fewer questions or try again with other options.'
            );
        case 2:
            throw new APIValidationError('Invalid Parameter Provided');
        case 3:
            throw new APIValidationError('Invalid Session Token');
        case 4:
            throw new APIValidationError(
                'Session Token has been exhaustedSession Token has been exhausted'
            );
        default:
            break;
    }
}

export { getCategories, getQuestions, APIValidationError };
