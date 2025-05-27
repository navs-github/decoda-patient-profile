This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Switching Between Sample and Empty Patient Data

This project supports easily swapping between a populated sample dataset and an empty dataset for testing empty states.

### How it works

A symlink named `patient_data` points to either the `sample_patient_data` or `empty_patient_data` directory. The app always loads data from the `patient_data` symlink.

### Switching datasets

Use the provided script to switch between datasets:

```bash
# To use the sample (populated) data:
./switch_patient_data.sh sample

# To use the empty data:
./switch_patient_data.sh empty
```

After running the script, the symlink will point to the selected dataset. You may need to refresh your app in the browser to see the changes.

### Why use this?
- Quickly test how your app handles both real and empty data
- No need to manually copy or rename files

If you have any issues, make sure the script is executable (`chmod +x switch_patient_data.sh`).
