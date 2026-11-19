# Social Media Audience Overlap Analyzer
> **Discrete Mathematics Mini-Project: Application of Set Theory to Multi-Platform Social Media Audiences**

---

## 📌 Project Overview & Purpose

The **Social Media Audience Overlap Analyzer** is an interactive, responsive dashboard web application designed to demonstrate the practical application of **Set Theory** in real-world scenarios.

Modern digital marketing and audience intelligence rely heavily on set operations to determine:
1. **Total Unique Reach** (Union: $A \cup B \cup C$)
2. **Cross-Platform Convergent Audiences** (Intersections: $A \cap B, A \cap C, B \cap C, A \cap B \cap C$)
3. **Platform-Exclusive Loyalists** (Differences / Relative Complements: $A \setminus B, A \setminus C, \dots$)
4. **Mutually Disjoint Subsets** (The 7 canonical regions of a 3-set Venn diagram)
5. **Proportional Audience Overlap** ($\frac{|A \cap B|}{|A|} \times 100\%$)
6. **Principle of Inclusion-Exclusion (PIE)**

---

## 🚀 Quick Start Instructions

### 1. Open Project Directory
```powershell
cd C:\Users\nawag\.gemini\antigravity\scratch\audience-overlap-analyzer
```

### 2. Start the Development Server
```bash
npm run dev
```

Visit the displayed local URL (typically `http://localhost:5173/`).

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🧮 Discrete Mathematical Operations Implemented

| Operation | Mathematical Notation | Description |
| :--- | :--- | :--- |
| **Three-Set Union** | $I \cup T \cup F$ | All distinct unique users across Instagram, Twitter/X, and Facebook |
| **Pairwise Intersection (IG & TW)** | $I \cap T$ | Users common to both Instagram and Twitter/X |
| **Pairwise Intersection (IG & FB)** | $I \cap F$ | Users common to both Instagram and Facebook |
| **Pairwise Intersection (TW & FB)** | $T \cap F$ | Users common to both Twitter/X and Facebook |
| **Triple Intersection** | $I \cap T \cap F$ | Users present on all three platforms simultaneously |
| **Set Difference** | $A \setminus B$ | Elements present in set $A$ but strictly absent from set $B$ |
| **7 Disjoint Subsets** | 3-Set Venn Partition | Partitions the universe into 7 mutually exclusive regions |
| **Principle of Inclusion-Exclusion** | $|A \cup B \cup C| = \sum |A| - \sum |A \cap B| + |A \cap B \cap C|$ | Exact verification of cardinality without multiset overcounting |

---

## 📊 Default Sample Dataset

```text
Instagram (Set A):
Rahul, Amit, Priya, Neha, Karan

Twitter / X (Set B):
Amit, Priya, Karan, Rohit

Facebook (Set C):
Rahul, Priya, Rohit, Sneha
```

### Verified Mathematical Outcomes for Sample Data:
- $|Instagram| = 5$
- $|Twitter| = 4$
- $|Facebook| = 4$
- $|I \cup T \cup F| = 7$ (`Rahul, Amit, Priya, Neha, Karan, Rohit, Sneha`)
- $|I \cap T| = 3$ (`Amit, Priya, Karan`)
- $|I \cap F| = 2$ (`Rahul, Priya`)
- $|T \cap F| = 2$ (`Priya, Rohit`)
- $|I \cap T \cap F| = 1$ (`Priya`)
- **Principle of Inclusion-Exclusion**:
  $$5 + 4 + 4 - (3 + 2 + 2) + 1 = 13 - 7 + 1 = 7 \quad \text{(Verified } \text{LHS} = \text{RHS)}$$

---

## 🛠️ Technology Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** Lucide React
- **Architecture:** Zero backend, zero tracking, client-side deterministic set math.
