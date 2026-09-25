import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repo = process.env.REPO_NAME;
const base = process.env.GITHUB_PAGES === "true" && repo ? `/${repo}/` : "/";

export default defineConfig({
  base,
  plugins: [react()],
});
