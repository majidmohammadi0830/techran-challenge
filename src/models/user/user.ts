export type User = {
    id: number,
    firstName: string,
    lastName: string,
    age: number | string,
    gender: 'male' | 'female' | '',
    birthDate: string | null,
    country: string,
    city: string,
    jobTitle: string,
    phoneNumber: number | string,
    workType: WorkType
    description: string,
}

export type WorkType = {
    partTime: boolean,
    fullTime: boolean,
    freeLance: boolean,
}

export type UserErrors = {
    firstName?: string,
    lastName?: string,
    age?: string,
    gender?: string,
    birthDate?: string,
    country?: string,
    city?: string,
    jobTitle?: string,
    phoneNumber?: string,
    description?: string,
}


