import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 1000, // Our rate limiter works in 1 second windows.
  max: 10, // Limit each IP to 1 request per windowMs.
  message: "Too many requests from this IP, please try again shortly."
});

export default limiter;