---
title: "このサイトについて"
layout: "about"
summary: "aoiro-labo の技術スタックと運営環境について"
date: 2025-12-30T00:00:00+09:00
links:

- name: "Hugo"
  url: "https://gohugo.io/"
  icon: "https://gohugo.io/favicon.ico"
  description: "世界最速の静的サイトジェネレーター"

- name: "Cloudflare R2"
  url: "https://www.cloudflare.com/ja-jp/developer-platform/r2/"
  icon: "https://www.google.com/search?q=https://www.cloudflare.com/favicon.ico"
  description: "エグレス料金無料の S3 互換オブジェクトストレージ"

- name: "Giscus"
  url: "https://giscus.app/ja"
  icon: "https://www.google.com/search?q=https://giscus.app/favicon.ico"
  description: "GitHub Discussions を利用したコメントシステム"

- name: "GitHub"
  url: "https://github.com/aoiro-labo/aoiro_labo.com"
  icon: "https://github.com/fluidicon.png"
  description: "このサイトのソースコードを管理しているリポジトリ"
---
## aoiro-labo について

このサイトは、放送、アニメ、バーチャルなどの趣味や、技術的な備忘録をまとめている個人ブログです。
「書かないと忘れること」を主軸に、自分が後で見返して役立つ情報を発信しています。

## 技術スタック

軽量さとメンテナンス性を重視し、以下のモダンなツールセットで構築されています。

- SSG: Hugo Extended
- Theme: hugo-narrow (Minimalist 1-column theme)
- Infrastructure: Cloudflare Pages (Hosting)
- Object Storage: Cloudflare R2 (Images & Assets)
- Comments: Giscus (via GitHub Discussions)
- Design: Tailwind CSS 4.0

## 画像管理について
GitHub リポジトリの肥大化を防ぐため、画像アセットの多くは Cloudflare R2 にホスティングされ、カスタムドメイン images.aoiro-labo.com を通じて配信されています。