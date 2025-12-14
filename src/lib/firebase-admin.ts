import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Database, getDatabase } from "firebase-admin/database";

let app: App | undefined;
let database: Database | undefined;

// Firebase 환경변수 확인
function isFirebaseConfigured(): boolean {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY &&
    process.env.FIREBASE_DATABASE_URL
  );
}

function getFirebaseApp(): App | null {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase is not configured. View counts will not work.");
    return null;
  }

  if (app) return app;

  const apps = getApps();
  if (apps.length > 0) {
    app = apps[0];
    return app;
  }

  // Firebase Admin SDK 초기화
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // private key의 \n 문자열을 실제 줄바꿈으로 변환
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  return app;
}

export function getFirebaseDatabase(): Database | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;

  if (database) return database;

  database = getDatabase();
  return database;
}

// 조회수 관련 유틸리티 함수
export async function getViewCount(postId: string): Promise<number> {
  const db = getFirebaseDatabase();
  if (!db) return 0;

  const snapshot = await db.ref(`views/${postId}`).get();
  return snapshot.exists() ? snapshot.val() : 0;
}

export async function incrementViewCount(postId: string): Promise<number> {
  const db = getFirebaseDatabase();
  if (!db) return 0;

  const ref = db.ref(`views/${postId}`);

  const snapshot = await ref.get();
  const currentViews = snapshot.exists() ? snapshot.val() : 0;
  const newViews = currentViews + 1;

  await ref.set(newViews);
  return newViews;
}

export async function getAllViewCounts(): Promise<Record<string, number>> {
  const db = getFirebaseDatabase();
  if (!db) return {};

  const snapshot = await db.ref("views").get();
  return snapshot.exists() ? snapshot.val() : {};
}
