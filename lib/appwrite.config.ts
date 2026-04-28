import * as sdk from "node-appwrite";

export const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
export const APPWRITE_PROJECT_NAME = process.env.APPWRITE_PROJECT_NAME;
export const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;
export const APPWRITE_DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
export const APPWRITE_PATIENT_COLLECTION_ID = process.env.APPWRITE_PATIENT_COLLECTION_ID;
export const APPWRITE_DOCTOR_COLLECTION_ID = process.env.APPWRITE_DOCTOR_COLLECTION_ID;
export const APPWRITE_APPOINTMENT_COLLECTION_ID = process.env.APPWRITE_APPOINTMENT_COLLECTION_ID;
export const APPWRITE_BUCKET_ID = process.env.APPWRITE_BUCKET_ID;
export const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;

const client = new sdk.Client();

client
  .setEndpoint(APPWRITE_ENDPOINT!)
  .setProject(APPWRITE_PROJECT_ID!)
  .setKey(APPWRITE_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
