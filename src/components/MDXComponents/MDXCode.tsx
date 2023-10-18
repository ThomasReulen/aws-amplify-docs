import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism, Highlight } from 'prism-react-renderer';
import { theme } from './code-theme';
import { View, Button } from '@aws-amplify/ui-react';
import { versions } from '@/constants/versions';

require('./cli-error-language.js');

const addVersions = (code: string) => {
  code = code.replace(/ANDROID_VERSION/g, versions.ANDROID_VERSION);
  code = code.replace(/ANDROID_DEVPREVIEW/g, versions.ANDROID_DEVPREVIEW);
  code = code.replace(/ANDROID_V1_VERSION/g, versions.ANDROID_V1_VERSION);
  code = code.replace(
    /ANDROID_V1_GEO_VERSION/g,
    versions.ANDROID_V1_GEO_VERSION
  );
  code = code.replace(
    /ANDROID_V1_KOTLIN_VERSION/g,
    versions.ANDROID_V1_KOTLIN_VERSION
  );
  code = code.replace(/ANDROID_SDK_VERSION/g, versions.ANDROID_SDK_VERSION);
  code = code.replace(/KOTLIN_SDK_VERSION/g, versions.KOTLIN_SDK_VERSION);
  return code;
};

export const MDXCode = (props) => {
  const { codeString, language } = props;
  const [copied, setCopied] = React.useState(false);
  const [code, setCode] = React.useState(codeString);
  const copy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  React.useEffect(() => {
    setCode(addVersions(codeString));
  }, []);

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <>
          <div style={{ display: 'none' }}>
            {/* searchable code */}
            {codeString}
          </div>
          <View className="pre-wrapper">
            <pre style={style} className="pre">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="line-number">{i + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
            <CopyToClipboard text={codeString} onCopy={copy}>
              <Button
                size="small"
                variation="link"
                disabled={copied}
                className="code-copy"
                position="absolute"
                right="xxxs"
                top="xxxs"
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </CopyToClipboard>
          </View>
        </>
      )}
    </Highlight>
  );
};