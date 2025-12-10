export enum ServiceCreationErrors {
    SERVER_ERROR = "Something went wrong.",
    TOO_MANY_INSTANCES = "You already have another service instance.",
    ALREADY_HAVE_INSTANCE = "You already have a service instance.",
}

export enum ServiceRenewErrors {
    SERVER_ERROR = "Something went wrong.",
    NO_INSTANCE = "You don't have any service instances.",
}

export enum ServiceDeletionErrors {
    SERVER_ERROR = "Something went wrong.",
    NO_INSTANCE = "You don't have any service instances.",
}

export class ServiceCreationError extends Error {
    constructor(error: ServiceCreationErrors, message?: string) {
        super(error ?? message);
        this.name = "ServiceCreationError";

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ServiceRenewError extends Error {
    constructor(error: ServiceRenewErrors, message?: string) {
        super(error ?? message);
        this.name = "ServiceRenewError";

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ServiceDeletionError extends Error {
    constructor(error: ServiceDeletionErrors, message?: string) {
        super(error ?? message);
        this.name = "ServiceDeletionError";

        Object.setPrototypeOf(this, new.target.prototype);
    }
}