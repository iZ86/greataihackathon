import { defineStorage } from "@aws-amplify/backend";

const BUCKET_FOLDER: string = process.env.BUCKET_FOLDER as string;
const BUCKET_NAME: string = process.env.BUCKET_NAME as string;

export const storage = defineStorage(
  {
    name: `${BUCKET_NAME}`,
    access: (allow) => ({
      [`${BUCKET_FOLDER}/*`]: [
        allow.authenticated.to(['read', 'write', 'delete'])
      ],
    }),
  }
);
