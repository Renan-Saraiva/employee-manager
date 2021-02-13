export interface Config {
    managerApi: API;
}

export interface API {
    skills: Service;
    employees: Service;
    url: string;
}

export interface Service {
    url: string;
}