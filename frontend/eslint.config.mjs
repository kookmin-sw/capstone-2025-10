import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  js.configs.recommended, // JavaScript 기본 규칙
  prettier.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: ["node_modules/**", "public/**", ".next/**"], // ESLint 무시할 폴더
    rules: {
      "no-unused-vars": "warn", // 미사용 변수 경고
      "no-undef": "error", // 정의되지 않은 변수 금지
      "eqeqeq": "error", // == 대신 === 사용 강제
      "no-console": "warn", // console.log 경고
      "curly": "error", // 중괄호 {} 필수
      "prefer-const": "warn", // const 사용 권장
      "indent": ["error", 2], // 들여쓰기 2칸
    },
  },
];

export default eslintConfig;
