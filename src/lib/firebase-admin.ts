import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { Database, getDatabase } from "firebase-admin/database";

let app: App | undefined;
let database: Database | undefined;

// 서비스 계정 정보를 파싱
function getServiceAccount(): {
  projectId: string;
  clientEmail: string;
  privateKey: string;
  databaseURL: string;
} | null {
  // 방법 1: Base64 인코딩된 서비스 계정 JSON (권장)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    try {
      const decoded = Buffer.from(
        process.env.FIREBASE_SERVICE_ACCOUNT_BASE64,
        "base64"
      ).toString("utf-8");
      const serviceAccount = JSON.parse(decoded);

      return {
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
        databaseURL:
          process.env.FIREBASE_DATABASE_URL ||
          `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
      };
    } catch (error) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64:", error);
      return null;
    }
  }

  // 방법 2: 개별 환경변수 (레거시 호환)
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY &&
    process.env.FIREBASE_DATABASE_URL
  ) {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    };
  }

  return null;
}

function getFirebaseApp(): App | null {
  const serviceAccount = getServiceAccount();

  if (!serviceAccount) {
    console.warn("Firebase is not configured. View counts will not work.");
    return null;
  }

  if (app) return app;

  const apps = getApps();
  if (apps.length > 0) {
    app = apps[0];
    return app;
  }

  try {
    // Firebase Admin SDK 초기화
    app = initializeApp({
      credential: cert({
        projectId: serviceAccount.projectId,
        clientEmail: serviceAccount.clientEmail,
        privateKey: serviceAccount.privateKey,
      }),
      databaseURL: serviceAccount.databaseURL,
    });

    return app;
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
    return null;
  }
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
