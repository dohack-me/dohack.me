export function cookieConsentGiven() {
    if (!localStorage.getItem("cookie_consent")) {
        return "undecided";
    }
    return localStorage.getItem("cookie_consent")!;
}