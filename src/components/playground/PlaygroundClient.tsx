'use client';

import { Button, Card, CardBody, Select, SelectItem } from '@heroui/react';
import { Play, RotateCcw, Terminal } from 'lucide-react';
import { useTheme } from 'next-themes';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';

const LANGUAGES = [
  {
    label: 'Python',
    value: 'python',
    version: '3.10.0',
    defaultCode:
      '# Python 템플릿\nprint("Hello, World!")\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Playground"))',
  },
  {
    label: 'Java',
    value: 'java',
    version: '15.0.2',
    defaultCode:
      'public class Main {\n    public static void main(String[] args) {\n        // Java 템플릿\n        System.out.println("Hello, World!");\n        \n        greet("Playground");\n    }\n    \n    public static void greet(String name) {\n        System.out.println("Hello, " + name + "!");\n    }\n}',
  },
  {
    label: 'C',
    value: 'c',
    version: '10.2.1',
    defaultCode:
      '#include <stdio.h>\n\nint main() {\n    // C 템플릿\n    printf("Hello, World!\\n");\n    \n    char name[] = "Playground";\n    printf("Hello, %s!\\n", name);\n    \n    return 0;\n}',
  },
];

export default function PlaygroundClient() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(language.defaultCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;

    const selected = LANGUAGES.find((lang) => lang.value === value);
    if (selected) {
      setLanguage(selected);
      setCode(selected.defaultCode);
      setOutput('');
      setError('');
    }
  };

  const highlightCode = (code: string) => {
    const lang = languages[language.value] || languages.clike;
    return highlight(code, lang, language.value);
  };

  const runCode = async () => {
    setIsLoading(true);
    setOutput('');
    setError('');

    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language.value,
          version: language.version,
          files: [
            {
              content: code,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.run) {
        if (data.run.stderr) {
          setError(data.run.stderr);
        }
        setOutput(data.run.stdout || (data.run.stderr ? '' : 'No output'));
      } else {
        setError('코드 실행 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('서버와 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetCode = () => {
    setCode(language.defaultCode);
    setOutput('');
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 pt-32">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Playground</h1>
            <p className="text-default-500">
              웹 브라우저에서 바로 코드를 작성하고 실행해보세요.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select
              label="언어"
              placeholder="언어 선택"
              labelPlacement="outside"
              className="w-48"
              classNames={{
                trigger: 'min-h-10 h-10',
                value: 'text-small',
                label: 'text-small font-medium',
                innerWrapper: 'w-full',
                selectorIcon: 'right-3',
              }}
              selectedKeys={[language.value]}
              onChange={handleLanguageChange}
              size="sm">
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value}>{lang.label}</SelectItem>
              ))}
            </Select>
            <div className="flex items-center gap-2 mt-5">
              <Button
                color="danger"
                variant="flat"
                isIconOnly
                onPress={resetCode}
                aria-label="초기화">
                <RotateCcw size={20} />
              </Button>
              <Button
                color="primary"
                className="font-medium"
                startContent={<Play size={20} fill="currentColor" />}
                onPress={runCode}
                isLoading={isLoading}>
                실행하기
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* Editor Area */}
          <Card
            className={`border-none shadow-xl overflow-hidden ${
              isDark ? 'bg-[#282c34]' : 'bg-[#fafafa]'
            }`}>
            <CardBody className="p-0 overflow-auto">
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={highlightCode}
                padding={16}
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
                  fontSize: 14,
                  lineHeight: 1.5,
                  minHeight: '100%',
                  backgroundColor: 'transparent',
                  caretColor: isDark ? 'white' : 'black',
                }}
                className={`min-h-full focus:outline-none ${
                  isDark ? 'prism-dark' : 'prism-light'
                }`}
                textareaClassName="focus:outline-none"
              />
            </CardBody>
          </Card>

          {/* Console Area */}
          <Card
            className={`border-none shadow-xl overflow-hidden ${
              isDark ? 'bg-[#1e1e1e]' : 'bg-[#f5f5f5]'
            }`}>
            <div className="px-4 py-2 bg-default-100 flex items-center gap-2 border-b border-default-200">
              <Terminal size={16} className="text-default-500" />
              <span className="text-xs font-semibold text-default-600 uppercase tracking-wider">
                Console
              </span>
            </div>
            <CardBody className="p-4 font-mono text-sm overflow-auto">
              {isLoading ? (
                <div className="flex items-center gap-2 text-primary">
                  <span className="animate-pulse">실행 중...</span>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="text-danger whitespace-pre-wrap mb-4">
                      {error}
                    </div>
                  )}
                  {output && (
                    <div className="text-success whitespace-pre-wrap">
                      {output}
                    </div>
                  )}
                  {!output && !error && (
                    <div className="text-default-400 italic">
                      코드를 실행하면 결과가 여기에 표시됩니다.
                    </div>
                  )}
                </>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
