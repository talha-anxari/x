import { aj } from "../config/arcjet.js";
// Arcjet middleware for rate limiting, bot protection, and security
// export const arcjetMiddleware = async(req, res, next) => {
//     try {
//         const decision = await aj.protect(req, {
//             requested: 1, // each request counts as 1 unit
//         });
//         if(decision.isDenied()){
//             if(decision.reason.isRateLimit()){
//                 return res.status(429).json({
//                     error: "Bot access denied",
//                     message: "Rate limit exceeded. Please try again later.",
//                 })
//             }else if(decision.reason.isBot()){
//                 return res.status(403).json({
//                     error: "Bot access denied",
//                     message: "Access denied for bots.",
//                 });
//             }else{
//                 return res.status(403).json({
//                     error: "Access denied",
//                     message: decision.reason.message,
//                 });
//             }
//         }
        
//     } catch (error) {
//         console.error("Arcjet middleware error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
      ip: req.ip
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Rate limit exceeded",
          message: "Please try again later.",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Bot access denied",
          message: "Access denied for bots.",
        });
      } else {
        return res.status(403).json({
          error: "Access denied",
          message: decision.reason.message,
        });
      }
    }
    // check for spoofed bots
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      return res.status(403).json({
        error: "Spoofed bot access denied",
        message: "Access denied for spoofed bots.",
      });
    }

    // ✅ If allowed, move to next middleware/route
    next();

  } catch (error) {
    console.error("Arcjet middleware error:", error);
    res.status(500).send("Internal Server Error");
  }
};
