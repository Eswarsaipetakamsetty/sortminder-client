type Language = {
    backendId: number;
    frontendId: number;
    name: string;
};

export const languages: Language[] = [
    { frontendId: 45, backendId: 45, name: "Assembly (NASM 2.14.02)" },
    { frontendId: 46, backendId: 46, name: "Bash (5.0.0)" },
    { frontendId: 47, backendId: 47, name: "Basic (FBC 1.07.1)" },
    { frontendId: 104, backendId: 75, name: "C (Clang 18.1.8)" },
    { frontendId: 54, backendId: 54, name: "C++ (GCC 9.2.0)" },
    { frontendId: 51, backendId: 51, name: "C# (Mono 6.6.0.161)" },
    { frontendId: 91, backendId: 62, name: "Java (JDK 17.0.6)" },
    { frontendId: 97, backendId: 63, name: "JavaScript (Node.js 20.17.0)" },
    { frontendId: 92, backendId: 71, name: "Python (3.11.2)" },
    { frontendId: 73, backendId: 73, name: "Rust (1.40.0)" },
    { frontendId: 94, backendId: 74, name: "TypeScript (5.0.3)" }
];
