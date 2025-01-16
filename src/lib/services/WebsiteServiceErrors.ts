// enum is in a different file otherwise nextjs will think this is supposed to be a server action :moyai:
export enum WebsiteServiceErrors {
    INVALID_ID,
    SERVER_ERROR,
    TOO_MANY_INSTANCES,
    ALREADY_HAVE_INSTANCE
}