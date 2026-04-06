import { NextRequest, NextResponse } from 'next/server';

// Rextester API 언어 ID 매핑
const REXTESTER_LANGUAGE_IDS: Record<string, number> = {
  python: 24, // Python 3
  java: 4, // Java
  c: 6, // C (gcc)
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language, files } = body;

    if (!language || !files || !files[0]?.content) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 },
      );
    }

    const code = files[0].content;
    const languageId = REXTESTER_LANGUAGE_IDS[language];

    if (languageId === undefined) {
      return NextResponse.json(
        { error: '지원하지 않는 언어입니다.' },
        { status: 400 },
      );
    }

    // Rextester API 호출
    const formData = new URLSearchParams();
    formData.append('LanguageChoice', languageId.toString());
    formData.append('Program', code);
    formData.append('Input', '');
    formData.append('CompilerArgs', '');

    const response = await fetch('https://rextester.com/rundotnet/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `코드 실행 서버 오류: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Rextester 응답을 기존 형식으로 변환
    return NextResponse.json({
      run: {
        stdout: data.Result || '',
        stderr: data.Errors || data.Warnings || '',
      },
    });
  } catch (error) {
    console.error('Code execution error:', error);
    return NextResponse.json(
      { error: '서버와 통신 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
