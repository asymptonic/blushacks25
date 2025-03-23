// import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
// import { PLAID_CLIENT_ID, PLAID_SECRET } from '$env/static/private';


// const configuration = new Configuration({
//     basePath: PlaidEnvironments.sandbox,
//     baseOptions: {
//         headers: {
//         'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
//         'PLAID-SECRET': PLAID_SECRET,
//         },
//     },
// });

// const client = new PlaidApi(configuration);
// app.get("/api/create_link_token", async (req, res, next) => {
//     const tokenResponse = await client.linkTokenCreate({
//       user: { client_user_id: req.sessionID },
//       client_name: "Plaid's Tiny Quickstart",
//       language: "en",
//       products: ["auth"],
//       country_codes: ["US"],
//       redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
//     });
//     res.json(tokenResponse.data);
//   });
// });
