# 📁 eybdashboard - Project Structure

*Generated on: 02/02/2026, 13:11:02*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 54 |
| 📁 Total Folders | 30 |
| 🌳 Max Depth | 5 levels |
| 🛠️ Tech Stack | React, Next.js, TypeScript, CSS, Node.js |

## ⭐ Important Files

- 🟡 🚫 **.gitignore** - Git ignore rules
- 🔴 📖 **README.md** - Project documentation
- 🔵 🔍 **eslint.config.mjs** - ESLint config
- 🟡 ▲ **next.config.ts** - Next.js config
- 🔴 📦 **package.json** - Package configuration
- 🟡 🔷 **tsconfig.json** - TypeScript config

## 📊 File Statistics

### By File Type

- ⚛️ **.tsx** (React TypeScript files): 30 files (55.6%)
- 🔷 **.ts** (TypeScript files): 7 files (13.0%)
- 🎨 **.svg** (SVG images): 5 files (9.3%)
- ⚙️ **.json** (JSON files): 3 files (5.6%)
- 📖 **.md** (Markdown files): 2 files (3.7%)
- 📄 **.mjs** (Other files): 2 files (3.7%)
- ⚙️ **.yaml** (YAML files): 2 files (3.7%)
- 🚫 **.gitignore** (Git ignore): 1 files (1.9%)
- 🖼️ **.ico** (Icon files): 1 files (1.9%)
- 🎨 **.css** (Stylesheets): 1 files (1.9%)

### By Category

- **React**: 30 files (55.6%)
- **TypeScript**: 7 files (13.0%)
- **Assets**: 6 files (11.1%)
- **Config**: 5 files (9.3%)
- **Docs**: 2 files (3.7%)
- **Other**: 2 files (3.7%)
- **DevOps**: 1 files (1.9%)
- **Styles**: 1 files (1.9%)

### 📁 Largest Directories

- **root**: 54 files
- **app**: 26 files
- **app/dashboard**: 20 files
- **app/dashboard/add-listing**: 10 files
- **components**: 10 files

## 🌳 Directory Structure

```
eybdashboard/
├── 🟡 🚫 **.gitignore**
├── 📂 admin/
├── 🚀 app/
│   ├── 📂 add-listing/
│   │   ├── 📂 _data/
│   │   │   └── 🔷 options.ts
│   │   └── 📂 _types/
│   │   │   └── 🔷 listing.ts
│   ├── 📂 admin/
│   ├── 📂 commissions/
│   ├── 📂 dashboard/
│   │   ├── 📂 add-listing/
│   │   │   ├── 📂 _components/
│   │   │   │   ├── ⚛️ StepIndicator.tsx
│   │   │   │   └── 📂 steps/
│   │   │   │   │   ├── ⚛️ Step1Type.tsx
│   │   │   │   │   ├── ⚛️ Step2Basics.tsx
│   │   │   │   │   ├── ⚛️ Step3PricingLocation.tsx
│   │   │   │   │   ├── ⚛️ Step4MediaSeller.tsx
│   │   │   │   │   └── ⚛️ Step5Review.tsx
│   │   │   ├── 📂 _data/
│   │   │   │   └── 🔷 options.ts
│   │   │   ├── 📂 _types/
│   │   │   │   └── 🔷 listing.ts
│   │   │   ├── ⚛️ ListingWizard.tsx
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 commissions/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 documents/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 invoices/
│   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ layout.tsx
│   │   ├── 📂 leads/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 listings/
│   │   │   └── ⚛️ page.tsx
│   │   ├── ⚛️ page.tsx
│   │   ├── 📂 payouts/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 referrals/
│   │   │   └── ⚛️ page.tsx
│   │   └── 📂 settings/
│   │   │   └── ⚛️ page.tsx
│   ├── 📂 documents/
│   ├── 🖼️ favicon.ico
│   ├── 🎨 globals.css
│   ├── 📂 invoices/
│   ├── ⚛️ layout.tsx
│   ├── 📂 leads/
│   ├── 📂 listings/
│   ├── ⚛️ page.tsx
│   └── 📂 settings/
├── 🧩 components/
│   ├── ⚛️ RightSidebar.tsx
│   ├── ⚛️ Sidebar.tsx
│   ├── ⚛️ TopNav.tsx
│   └── 🎨 ui/
│   │   ├── ⚛️ badge.tsx
│   │   ├── ⚛️ button.tsx
│   │   ├── ⚛️ card.tsx
│   │   ├── ⚛️ dialog.tsx
│   │   ├── ⚛️ dropdown-menu.tsx
│   │   ├── ⚛️ input.tsx
│   │   └── ⚛️ table.tsx
├── ⚙️ components.json
├── 🔵 🔍 **eslint.config.mjs**
├── 📚 lib/
│   └── 🔷 utils.ts
├── 🔷 next-env.d.ts
├── 🟡 ▲ **next.config.ts**
├── 🔴 📦 **package.json**
├── ⚙️ pnpm-lock.yaml
├── ⚙️ pnpm-workspace.yaml
├── 📄 postcss.config.mjs
├── 📖 project_structure.md
├── 🌐 public/
│   ├── 🎨 file.svg
│   ├── 🎨 globe.svg
│   ├── 🎨 next.svg
│   ├── 🎨 vercel.svg
│   └── 🎨 window.svg
├── 🔴 📖 **README.md**
└── 🟡 🔷 **tsconfig.json**
```

## 📖 Legend

### File Types
- 🚫 DevOps: Git ignore
- 📖 Docs: Markdown files
- 🔷 TypeScript: TypeScript files
- ⚛️ React: React TypeScript files
- 🖼️ Assets: Icon files
- 🎨 Styles: Stylesheets
- ⚙️ Config: JSON files
- 📄 Other: Other files
- ⚙️ Config: YAML files
- 🎨 Assets: SVG images

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
