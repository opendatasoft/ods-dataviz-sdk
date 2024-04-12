import { defineConfig } from 'vite';
import path from 'path';

const projectRootDir = path.resolve(__dirname);
export default defineConfig({
    root: 'src',
    resolve: {
        alias: {
            src: path.resolve(projectRootDir, 'src'),
            reactify: path.resolve(projectRootDir, 'src/reactify'),
            stories: path.resolve(projectRootDir, 'stories'),
        },
    },
});