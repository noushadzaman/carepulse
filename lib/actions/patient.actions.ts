"use server";

import { ID, Query } from "node-appwrite";
import {
  databases,
  APPWRITE_BUCKET_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_ENDPOINT,
  APPWRITE_PATIENT_COLLECTION_ID,
  APPWRITE_PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createuser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);

      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async (formData: FormData) => {
  try {
    const patientDataString = formData.get("patientData") as string;
    const patient = JSON.parse(patientDataString);

    let file;
    const blobFile = formData.get("blobFile") as Blob;
    const fileName = formData.get("fileName") as string;

    if (blobFile && fileName) {
      const buffer = Buffer.from(await blobFile.arrayBuffer());
      const inputFile = InputFile.fromBuffer(buffer, fileName);

      file = await storage.createFile(
        APPWRITE_BUCKET_ID!,
        ID.unique(),
        inputFile,
      );
    }

    const newPatient = await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : undefined,
        identificationDocumentUrl: file?.$id
          ? `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${file.$id}/view?project=${APPWRITE_PROJECT_ID}`
          : undefined,
        ...patient,
      },
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
