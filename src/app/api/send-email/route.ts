import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Gmail SMTP 트랜스포터 생성
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // 본인 Gmail 주소
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail 앱 비밀번호
  },
});

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequestBody = await request.json();
    const { name, email, subject, message } = body;

    // 필수 필드 검증
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 },
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 },
      );
    }

    // Gmail SMTP를 통해 이메일 전송
    await transporter.sendMail({
      from: `"요람일지 문의" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // 본인에게 전송
      replyTo: email, // 발신자 이메일로 답장 가능
      subject: `[요람일지] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f8f6f3;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- 헤더 -->
            <tr>
              <td style="background: linear-gradient(135deg, #f56a33 0%, #ff8c5a 100%); padding: 32px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                  📬 새로운 문의가 도착했습니다
                </h1>
              </td>
            </tr>
            
            <!-- 본문 -->
            <tr>
              <td style="padding: 32px;">
                <!-- 발신자 정보 -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #f8f6f3; border-radius: 12px; padding: 20px;">
                  <tr>
                    <td style="padding: 16px;">
                      <p style="margin: 0 0 12px 0; font-size: 14px; color: #6b6864;">
                        <strong style="color: #2d2c2a;">보낸 사람</strong>
                      </p>
                      <p style="margin: 0 0 8px 0; font-size: 16px; color: #2d2c2a;">
                        ${name}
                      </p>
                      <p style="margin: 0; font-size: 14px; color: #f56a33;">
                        ${email}
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- 제목 -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                  <tr>
                    <td>
                      <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b6864;">
                        <strong>제목</strong>
                      </p>
                      <p style="margin: 0; font-size: 18px; color: #2d2c2a; font-weight: 600;">
                        ${subject}
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- 메시지 -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                  <tr>
                    <td>
                      <p style="margin: 0 0 12px 0; font-size: 14px; color: #6b6864;">
                        <strong>메시지</strong>
                      </p>
                      <div style="padding: 20px; background-color: #fdfcfa; border-left: 4px solid #f56a33; border-radius: 0 8px 8px 0;">
                        <p style="margin: 0; font-size: 15px; color: #2d2c2a; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- 답장 버튼 -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="text-align: center; padding-top: 16px;">
                      <a href="mailto:${email}" style="display: inline-block; padding: 14px 32px; background-color: #f56a33; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 15px;">
                        답장하기
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- 푸터 -->
            <tr>
              <td style="padding: 24px; background-color: #f8f6f3; text-align: center; border-top: 1px solid #e5e1da;">
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b6864;">
                  이 이메일은 <strong>요람일지</strong> 웹사이트에서 발송되었습니다.
                </p>
                <p style="margin: 0; font-size: 12px; color: #8d8a85;">
                  © ${new Date().getFullYear()} 요람일지. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: '이메일이 성공적으로 전송되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: '이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 },
    );
  }
}
