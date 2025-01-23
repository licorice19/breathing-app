# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Requirements
NodeJS 20

## Installation
1. Install dependencies: `npm install`
2. Run project: `npm run dev`

## Adding other exercises
All exercises can be found in the file `src/data/exercises.js`

The file is human-readable and beginner-friendly. Only three commands are supported: inhale, exhale, hold. 
```
export const exercises = [
    {
        id: 1,
        name: "Box Breathing (Easy)",
        sequence: [
            { type: "inhale", duration: 4 },
            { type: "hold", duration: 4 },
            { type: "exhale", duration: 4 },
            { type: "hold", duration: 4 },
        ],
        repetitions: 6,
    },
```
