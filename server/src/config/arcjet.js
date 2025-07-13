import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";
import { ENV } from "./env.js";

// initial Arcjet with security rules
export const aj = arcjet({
    key: ENV.ARCJET_KEY,
    characteristics: ["ip.src", "user_agent"],
    // shield protects your app from common attacks e.g. SOL injection, XSS, CSRF attacks
    rules: [
        shield({ mode: "LIVE"}),
        // bot detection — block alt bots except search engines

        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                // allow legitimate search engine bots
                // see full list at https://arcjet.com/bot-list
            ],
        }),
        // rate limiting with token bucket algorithm
        tokenBucket({
            mode: "LIVE",
            refillRate: 10,
            interval: 10,
            capacity: 15,
            // 10 requests per 10 seconds, max 15 requests
        }),
    ],
});