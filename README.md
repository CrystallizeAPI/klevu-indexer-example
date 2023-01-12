# Klevu Import

Very simple script that import to Klevu API


# How does it work

First you need a dump from your Crystallize Tenant

```bash
npx @crystallize/cli-next@latest dump data ${TENANT_IDENTIFIER}
```

Then once `npm install`, and `npm run build` you can run the import


```bash
# create
npm run dev {$PATH_TO_THE_DUMP}

# update
npm run dev {$PATH_TO_THE_DUMP} update
```

> Assuming your `.env` file is setup correctly.
