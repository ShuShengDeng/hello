import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="zh-CN" class="bg-primary-50 text-surface-950">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="DenoSkill - 高品质全栈应用" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <title>DenoSkill</title>
      </head>
      <body class="antialiased">
        <Component />
      </body>
    </html>
  );
});
