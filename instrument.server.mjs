import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://ac70d47f0f1c67f9b6802b3a6d3e0850@o4509864549154816.ingest.us.sentry.io/4509864551579648",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
