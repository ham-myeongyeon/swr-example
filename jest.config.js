const Config = {
  verbose: true,
  moduleDirectories: ["node_modules", "<rootDir>/"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@mocks/(.*)$": "<rootDir>/mocks/$1",

    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(css|less|scss|sass)\\?modules$": "identity-obj-proxy",

    "^swr$": "<rootDir>/core/src/index.ts",
    "^swr/infinite$": "<rootDir>/infinite/src/index.ts",
    "^swr/immutable$": "<rootDir>/immutable/src/index.ts",
    "^swr/subscription$": "<rootDir>/subscription/src/index.ts",
    "^swr/mutation$": "<rootDir>/mutation/src/index.ts",
    "^swr/_internal$": "<rootDir>/_internal/src/index.ts",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/mocks/styleMock.js",

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/mocks/fileMock.js",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jest-environment-jsdom" || "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  transformIgnorePatterns: ["^.+\\.module\\.(css|sass|scss)$"],
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.js"],
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
};

module.exports = async () => {
  Config.transformIgnorePatterns = [
    // 아래에 적혀있는 패키지 들을 제외한 모든 패키지를 가리킨다는 의미
    // 즉 적혀있는 패키지를 제외하고 무시하라는 의미로, 적혀있는 패키지만 trasform한다는 의미
    "^.+\\node_module\\.(css|sass|scss)$",
    "node_modules/(?!(uuid|dom7)/)",
  ];
  return Config;
};
