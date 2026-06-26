export default {
  providers: [
    {
      // CONVEX_SITE_URL is set automatically in the Convex deployment by
      // `npx @convex-dev/auth` during setup.
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex"
    }
  ]
};
