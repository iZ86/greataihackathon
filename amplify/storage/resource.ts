import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage(
  {
    name: 'medicalQueryBucket',
    access: (allow) => ({
      'medical-query-bucket/*': [
        allow.authenticated.to(['read', 'write', 'delete'])
      ],
    }),
  }
);
