# 🇺🇿 Uzbek Spell Checker Bot

A Telegram bot that checks spelling errors in **Uzbek (both Latin and Cyrillic)** texts.  
Built using **Node.js** and **grammY**, it uses the [uz-hunspell](https://github.com/u2b3k/uz-hunspell) dictionaries for accurate typo detection.

---

## ✨ Features

- ✅ Detects typos in **Uzbek Latin** and **Cyrillic** text
- 🧠 Suggests correct word forms from the **Hunspell** dictionary
- 🤖 Built using [grammY](https://grammy.dev/) for smooth Telegram integration
- 🔤 Supports both short phrases and full sentences
- 🪶 Lightweight, fast, and accurate

---

## 🚀 Usage

1. Open Telegram and start a chat with the bot:
   👉 **[@SpellCheckerUzBot](https://t.me/SpellCheckerUzBot)**

2. Send a message in Uzbek — either Latin or Cyrillic script.

3. The bot will respond with:
   - ✅ “No typos found” — if your text is correct
   - 🔍 Suggested corrections for each detected typo

---

## 🧩 Tech Stack

- **Node.js**
- **grammY** – Telegram Bot Framework
- **uz-hunspell** – Uzbek Hunspell Dictionary
- **fs/promises** – For efficient dictionary reading
