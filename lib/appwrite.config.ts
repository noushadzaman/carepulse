import * as sdk from "node-appwrite";

export const NEXT_PUBLIC_APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
export const NEXT_PUBLIC_APPWRITE_PROJECT_NAME = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME;
export const NEXT_PUBLIC_APPWRITE_API_KEY = process.env.NEXT_PUBLIC_APPWRITE_API_KEY;
export const NEXT_PUBLIC_APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID;
export const NEXT_PUBLIC_APPWRITE_DOCTOR_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_DOCTOR_COLLECTION_ID;
export const NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID;
export const NEXT_PUBLIC_APPWRITE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
export const NEXT_PUBLIC_APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

const client = new sdk.Client();

client
  .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(NEXT_PUBLIC_APPWRITE_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
