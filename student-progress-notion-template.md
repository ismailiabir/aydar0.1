# 🌿 Student Progress Hub — Notion Template (Teal Edition)

> **Vibe:** cute · calm · motivating · organized  
> **Palette:** `#0F766E` · `#14B8A6` · `#5EEAD4` · `#CCFBF1` · `#F0FDFA`  
> **Use this as your all-in-one dashboard for subjects, exam prep, skills, resources, and countdowns.**

---

## ✨ 1) Dashboard (Main Page)

Create a top-level Notion page called **"🌊 My Study Command Center"** and add this structure:

### Header block ideas
- 🌸 **Quote of the Week**
- 🎯 **Main Goal This Semester**
- 💚 **Current Prep % (Overall)**
- ⏳ **Nearest Exam Countdown**

### Suggested layout (2 columns)

**Left column**
- Linked view: `📚 Subjects` (gallery or table)
- Linked view: `📝 Exam Tracker` (calendar)
- Linked view: `✅ Weekly Planner` (board by status)

**Right column**
- Linked view: `🧠 Skills Matrix` (table)
- Linked view: `📂 Resources Library` (gallery)
- Callout block: `🌿 Reflection Corner`

---

## 📚 2) Database: Subjects

Create a database named **`Subjects`** with these properties:

| Property | Type | Purpose |
|---|---|---|
| Subject | Title | Name of course (Math, Biology, etc.) |
| Teacher | Text | Instructor name |
| Credits | Number | Optional weighting |
| Current Grade | Number | Your current mark |
| Target Grade | Number | Goal mark |
| Difficulty | Select | Easy / Medium / Hard |
| Prep % | Number | Current preparation (0–100) |
| Skills Required | Relation → Skills Matrix | Link required skills |
| Next Exam | Relation → Exam Tracker | Link upcoming exam |
| Priority | Select | Low / Medium / High / Urgent |
| Notes | Text | Anything important |

### Cute touch
Add subject icons in title:
- ➗ Math
- 🧬 Biology
- 📖 Literature
- 🌍 Geography
- 💻 Computer Science

---

## 📝 3) Database: Exam Tracker

Create **`Exam Tracker`** with these properties:

| Property | Type | Purpose |
|---|---|---|
| Exam Name | Title | e.g., Midterm 1 |
| Subject | Relation → Subjects | Which subject |
| Exam Date | Date | Exam day |
| Exam Type | Select | Quiz / Midterm / Final / Oral / Practical |
| Weight % | Number | Contribution to final grade |
| Readiness % | Number | How ready you feel |
| Days Left | Formula | Countdown |
| Status | Formula | Upcoming / Soon / Today / Done |
| Past Papers Done | Number | # completed |
| Revision Plan | Text | Strategy |
| Result | Number | Fill after exam |

### Formula: Days Left
```notion
if(empty(prop("Exam Date")), "No date", format(dateBetween(prop("Exam Date"), now(), "days")))
```

### Formula: Status
```notion
if(empty(prop("Exam Date")), "🫥 Unscheduled",
if(dateBetween(prop("Exam Date"), now(), "days") < 0, "✅ Done",
if(dateBetween(prop("Exam Date"), now(), "days") == 0, "🔥 Today",
if(dateBetween(prop("Exam Date"), now(), "days") <= 7, "⚠️ Soon", "🌱 Upcoming"))))
```

---

## 🧠 4) Database: Skills Matrix

Create **`Skills Matrix`** with these properties:

| Property | Type | Purpose |
|---|---|---|
| Skill | Title | e.g., Derivatives, Essay Structuring |
| Subject | Relation → Subjects | Skill’s subject |
| Level Required | Select | Basic / Intermediate / Advanced |
| Your Level | Select | Beginner / Learning / Comfortable / Mastered |
| Practice Sessions | Number | Number of focused sessions |
| Mastery % | Formula | Progress estimate |
| Last Practiced | Date | Last review date |
| Next Review | Date | Spaced repetition date |
| Resources | Relation → Resources Library | Learning links |

### Formula: Mastery % (simple)
```notion
if(prop("Your Level") == "Mastered", 100,
if(prop("Your Level") == "Comfortable", 75,
if(prop("Your Level") == "Learning", 45,
if(prop("Your Level") == "Beginner", 20, 0))))
```

---

## 📂 5) Database: Resources Library

Create **`Resources Library`** with these properties:

| Property | Type | Purpose |
|---|---|---|
| Resource | Title | Name of resource |
| Subject | Relation → Subjects | Related subject |
| Skill | Relation → Skills Matrix | Skill it helps |
| Type | Select | YouTube / PDF / Notes / Flashcards / Website / Book |
| Link / File | URL or Files | Access it quickly |
| Quality | Select | ⭐ / ⭐⭐ / ⭐⭐⭐ |
| Last Used | Date | Last revision |
| Saved For | Select | Quick review / Deep study / Exam prep |

---

## ✅ 6) Database: Weekly Planner

Create **`Weekly Planner`** with these properties:

| Property | Type | Purpose |
|---|---|---|
| Task | Title | Study task |
| Subject | Relation → Subjects | Context |
| Skill | Relation → Skills Matrix | Skill focus |
| Date | Date | Planned date |
| Duration (min) | Number | Planned time |
| Energy Needed | Select | Low / Medium / High |
| Priority | Select | Low / Medium / High |
| Status | Select | Not started / In progress / Done |
| Done? | Checkbox | completion |

### Views to add
- **Kanban by Status**
- **Calendar by Date**
- **Today Focus** filter: `Date is today OR tomorrow`

---

## 📊 7) Progress Widgets (inside Dashboard)

Use rollups/formulas from linked databases:

1. **Overall Preparation %**
   - Roll up average of `Prep %` from Subjects.
2. **Exams This Month**
   - Filter Exam Tracker where `Exam Date is within this month`.
3. **Skills Mastered Count**
   - Count skills where `Your Level = Mastered`.
4. **Hours Planned This Week**
   - Sum `Duration (min)` / 60 from Weekly Planner.

---

## 🌸 8) Aesthetic setup (Teal + Cute)

### Cover ideas
- Soft watercolor ocean, mint leaves, study desk flatlay.

### Icon set style
- Subjects: emoji icons (📘🧪💻)
- Exams: ⏳
- Skills: 🧠
- Resources: 📂
- Planner: ✅

### Color usage in Notion
- Use **teal**, **blue**, and **gray** text backgrounds for headings/callouts.
- Use dividers between sections for clean spacing.
- Use toggle blocks for "extra details" to keep dashboard uncluttered.

### Recommended callouts
- 💧 *Hydration check*
- 🌼 *Tiny win of the day*
- 💌 *Message to future me before exams*

---

## 💭 9) Reflection + Motivation section

Add a template button named **"Weekly Reset"** that creates:
- What went well this week?
- What felt difficult?
- What I’ll improve next week.
- One thing I’m proud of 🌟

Add another template button named **"Pre-Exam Check-in"**:
- Confidence level (1–10)
- Top 3 weak points
- Past papers completed
- Sleep plan before exam 😴

---

## 🚀 10) Starter data (copy this first)

### Subjects examples
- ➗ Math — Prep 52%
- 🧬 Biology — Prep 70%
- 💻 Computer Science — Prep 64%

### Skills examples
- Math: Integration by parts
- Biology: Cellular respiration diagrams
- CS: Time complexity analysis

### Resources examples
- YouTube playlist for integration
- PDF chapter notes
- Flashcard deck for biology terms

---

## 🫶 Improvement roadmap (we can iterate together)

Future upgrades to add:
- Grade predictor formula (target vs current)
- Burnout risk tracker (sleep + workload)
- Pomodoro auto-log table
- Habit streak tracker
- Exam-day checklist template
- University application / scholarship tracker

---

### Copy-paste tip
If you want this to feel like a polished Notion system fast:
1. Create all 5 databases first.
2. Build Dashboard last using linked views.
3. Add formulas + relations.
4. Apply teal-themed callouts and emoji icons.

You now have a **cute, teal, and practical Notion student operating system** 💚
