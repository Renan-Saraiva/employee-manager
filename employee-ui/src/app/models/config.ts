export interface Config {
    managerApi: API;
}

export interface API {
    skills: Service;
    employees: Service;
}

export interface Service {
    url: string;
}