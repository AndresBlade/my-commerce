type User = {
    id: number;
    name: string;
};

declare namespace Express {
    interface Request{
        Usuario?: User;
    }
}

