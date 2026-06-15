# Crucible Consulting — website

This is the complete website for Crucible Consulting. It is a "static" site, which means it is just a set of files (HTML, CSS, JavaScript, images). There is no software to install on a server and nothing to compile. You upload the files to GitHub and GitHub serves them to the world for free, at **crucible.consulting**.

This guide assumes you have not done this before. Follow it top to bottom and you will have a live website. If a step already looks done, skip it.

---

## What you will need

- A **GitHub account**. Free is fine. If you do not have one, create it at https://github.com/signup (it takes a couple of minutes).
- Access to your **Cloudflare account**, where the `crucible.consulting` domain is managed. This is where the web address is pointed at GitHub.
- The website files. They are in the zip you downloaded. **Unzip it first.** Inside you will find a folder called `crucible.consulting`. The files **inside** that folder are what you will upload.
- About 20 to 30 minutes. After that, the web address can take anywhere from a few minutes to a few hours to start working, which is normal.

> **One important note on plans.** On a **free** GitHub account, the website can only be published from a **public** repository (a public repository means anyone can see the files on GitHub). That is completely normal for a marketing website. If you want the files kept private on GitHub, you need a paid plan (GitHub Pro or higher), and you can then make the repository private while the website itself stays public. Either way the website is visible to everyone, which is the whole point.

> **Do not upload anything secret.** The published files can be read by anyone who visits the site. There are no secrets in this website, but as a rule never put passwords or API keys in here. In particular, the Cloudflare API token and IDs from your records belong in Cloudflare, not in this repository.

---

## The picture, in plain words

There are two halves to getting this live:

1. **Put the files on GitHub and switch on "GitHub Pages".** This makes the site live at a long GitHub address straight away.
2. **Point your domain (crucible.consulting) at GitHub in Cloudflare.** This makes the site live at your real web address.

Do them in that order.

---

## Part 1: Preview the site on your own computer first (optional but reassuring)

If you would like to see the site before publishing anything, you can. You need Python, which comes pre-installed on Macs and is a free download for Windows from https://www.python.org/downloads/.

1. Unzip the download.
2. Open a terminal (on Mac: the **Terminal** app; on Windows: **Command Prompt** or **PowerShell**).
3. Move into the site folder. Type `cd`  (with a space after it), then drag the unzipped `crucible.consulting` folder onto the terminal window (this pastes its location), then press Enter.
4. Type this and press Enter:
```
   python3 -m http.server 8000
```
   (On Windows, if `python3` is not recognised, try `python -m http.server 8000`.)
5. Open a web browser and go to **http://localhost:8000**. You will see the site.
6. When finished, go back to the terminal and press `Ctrl + C` to stop it.

This is only a local preview on your own machine. Nobody else can see it. Now let us publish it for real.

---

## Part 2: Put the files on GitHub

You have two ways to do this. **Method A uses only your web browser and needs no technical tools, so it is recommended if this is new to you.** Method B is for people comfortable with the command line.

### Method A: Upload in your web browser (recommended)

**Step 1: Create the repository (the place your files live on GitHub).**

1. Go to https://github.com and sign in.
2. In the top-right corner, click the **+** icon, then click **New repository**.
3. Fill in the form:
  - **Owner:** choose **ThomasAdamFleming**.
  - **Repository name:** type exactly `crucible.consulting`
  - **Description:** optional, you can leave it blank.
  - **Public / Private:** choose **Public** (required on a free plan; see the note near the top).
  - **Initialize this repository with:** leave every box **unticked** (do not add a README, .gitignore, or licence). You are bringing your own files.
4. Click the green **Create repository** button.

**Step 2: Upload the website files.**

1. On the new, empty repository page, find the line that says "...or **uploading an existing file**" and click that link. (If you do not see it, click **Add file** near the top, then **Upload files**.)
2. Open the unzipped `crucible.consulting` folder on your computer. You need to upload **everything inside it**, keeping the folders intact. The contents are:
```
   index.html      about.html      services.html     faq.html
   contact.html    404.html        README.md         CNAME
   robots.txt      sitemap.xml     site.webmanifest  .nojekyll
   css/   (folder)        js/   (folder)        assets/   (folder)
```
3. Select all of those files and folders, then **drag them into the upload box** in your browser. GitHub will show the files and folders being added. Wait for them all to appear.
4. Scroll down to "Commit changes" and click the green **Commit changes** button.

> **About the `.nojekyll` file.** It starts with a dot, so it is hidden by default and may not show in your file browser. It tells GitHub to serve the files exactly as they are. To see hidden files: on **Mac**, press `Cmd + Shift + .` in Finder; on **Windows**, open File Explorer, go to the **View** menu, and tick **Hidden items**. If you cannot get it to upload, do this instead: on GitHub click **Add file** then **Create new file**, type `.nojekyll` as the file name, leave the file empty, and click **Commit changes**. That is all it needs to be.

> **Important:** the files must sit at the **top level** of the repository, not inside an extra `crucible.consulting` sub-folder. If after uploading you see a single folder rather than `index.html` and friends, you uploaded the folder instead of its contents. Delete and re-upload the **contents**.

Now skip ahead to **Step 3: Switch on GitHub Pages**.

### Method B: Use the command line (only if you are comfortable with git)

This needs **git** installed (https://git-scm.com/downloads). From inside the unzipped `crucible.consulting` folder:

```bash
git init
git add .
git commit -m "Crucible Consulting website"
git branch -M main
git remote add origin https://github.com/ThomasAdamFleming/crucible.consulting.git
git push -u origin main
```

If GitHub asks you to create the repository first, do Step 1 from Method A (create an empty public repository named `crucible.consulting`), then run the commands above.

> Prefer a friendly app to the command line, especially for making edits later? Install **GitHub Desktop** (https://desktop.github.com), a free point-and-click program for the same job.

---

## Part 3: Switch on GitHub Pages

This is the same whether you used Method A or B.

1. On your repository page, click the **Settings** tab (top of the page, on the right).
2. In the left-hand menu, click **Pages**.
3. Under **Build and deployment**:
  - **Source:** choose **Deploy from a branch**.
  - **Branch:** choose **main**, and for the folder choose **/ (root)**.
  - Click **Save**.
4. Wait one to two minutes. Refresh the page. You should see a message like "Your site is live at https://thomasadamfleming.github.io/crucible.consulting/". You can click that to check the site works. (The styling and layout will all be there.)

At this point the site is live at that long GitHub address. Next we point your real domain at it.

---

## Part 4: Point your domain at GitHub (in Cloudflare)

Your domain `crucible.consulting` lives at Cloudflare. We will add five small records so the domain sends visitors to GitHub.

1. Go to https://dash.cloudflare.com and sign in.
2. Click your domain, **crucible.consulting**.
3. In the left-hand menu, click **DNS**, then **Records**.
4. **First, clear conflicts.** If you see an existing **A** record on the name `@` (the root of the domain) or a **CNAME** on `www` pointing somewhere else (for example a parking page), edit or delete those so they match the table below. **Leave any MX, TXT, or other records alone** (those are usually for email and should not be touched).
5. **Add the four A records.** For each one, click **Add record** and set:
  - **Type:** `A`
  - **Name:** `@`
  - **IPv4 address:** the value from the table below
  - **Proxy status:** click the orange cloud so it turns **grey** ("DNS only", see the note below)
  - **TTL:** Auto
  - Click **Save**, then repeat for the next IP address.
6. **Add the www record.** Click **Add record** and set:
  - **Type:** `CNAME`
  - **Name:** `www`
  - **Target:** `ThomasAdamFleming.github.io`
  - **Proxy status:** **grey** cloud (DNS only)
  - **TTL:** Auto
  - Click **Save**.

The records you should end up with:

| Type | Name | Value / Target | Proxy |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | DNS only |
| A | @ | 185.199.109.153 | DNS only |
| A | @ | 185.199.110.153 | DNS only |
| A | @ | 185.199.111.153 | DNS only |
| CNAME | www | ThomasAdamFleming.github.io | DNS only |

> **Why the grey cloud (DNS only)?** Cloudflare can "proxy" traffic (orange cloud), but while you are first setting up, that stops GitHub from confirming the domain and giving you the padlock (HTTPS). Use the grey cloud so setup works. Once everything is live with the padlock, you may switch `www` and `@` back to the orange cloud if you want Cloudflare's caching, but if you do, also go to Cloudflare's **SSL/TLS** section and set the mode to **Full** to avoid an error loop. If in doubt, just leave them grey; the site works perfectly that way.

---

## Part 5: Tell GitHub your domain, and turn on the padlock

1. Go back to your repository on GitHub: **Settings → Pages**.
2. Under **Custom domain**, type `crucible.consulting` and click **Save**. (It may already be filled in, because the upload included a `CNAME` file with your domain. That is expected.)
3. GitHub now checks your DNS. This can take a few minutes to a few hours, depending on how quickly the records spread across the internet. A green tick means it worked.
4. Once the check passes, the **Enforce HTTPS** box becomes available. **Tick it.** This makes the site load securely with the padlock (https://). If the box is greyed out, the certificate is not ready yet; check back later and tick it then.

---

## Part 6: Check it is working

- Open a browser and visit **https://crucible.consulting**. You should see the site with a padlock in the address bar.
- Visit **https://www.crucible.consulting**. It should automatically send you to the version without `www`.
- If it does not work immediately, wait. Domain changes are not instant. An hour is common; up to 24 hours is possible but unusual.
- To watch the domain "spread", you can paste `crucible.consulting` into https://www.whatsmydns.net and choose record type **A**. When most locations show the four GitHub addresses (185.199.108.153 and so on), you are nearly there.

That is it. The site is live.

---

## Troubleshooting (common first-time issues)

- **"There isn't a GitHub Pages site here" or a 404 right after deploying.** Give it two or three minutes and refresh. Make sure `index.html` is at the **top level** of the repository, not inside a sub-folder. Make sure Pages source is **main** and **/ (root)**.
- **The page loads but looks plain and unstyled.** The `css` and `js` folders did not upload with their structure. Re-upload the **contents** of the `crucible.consulting` folder so that `css/styles.css` exists in the repository.
- **GitHub says the custom domain is "improperly configured".** The DNS records have not spread yet, or a record still has the **orange** cloud. Switch the relevant records to the **grey** cloud and wait, then click the refresh/retry on the Pages screen.
- **"Enforce HTTPS" is greyed out.** The security certificate is still being issued. This can take up to 24 hours after DNS is correct. Come back and tick it later.
- **The site shows an old version after you make a change.** Browsers cache pages. Refresh with `Cmd + Shift + R` (Mac) or `Ctrl + F5` (Windows), or wait a minute.
- **A redirect loop or "too many redirects" error.** This happens if you turned the orange cloud on without setting Cloudflare SSL/TLS to **Full**. Either set it to Full in Cloudflare's SSL/TLS section, or switch the records back to the grey cloud.

If you get stuck, the official guide is here: https://docs.github.com/en/pages

---

## What is in this download (file map)

```
crucible.consulting/
├── index.html              Home page
├── about.html              About Tom
├── services.html           Services and how to start
├── faq.html                Frequently asked questions
├── contact.html            Contact (email, LinkedIn, message form)
├── 404.html                Shown if someone visits a page that does not exist
├── css/
│   └── styles.css          All the colours, fonts, and layout
├── js/
│   └── main.js             Small enhancements (menus, animations)
├── assets/                 Images and icons
│   ├── favicon.ico         The little icon in the browser tab
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── og-image.png        The preview image shown when the link is shared
│   └── img/
│       ├── mark.svg
│       ├── icon-192.png
│       └── icon-512.png
├── CNAME                   Your domain name (do not delete; GitHub needs it)
├── .nojekyll               Tells GitHub to serve the files as-is (hidden file)
├── robots.txt              Guidance for search engines
├── sitemap.xml             A list of pages for search engines
├── site.webmanifest        Settings for when the site is saved to a phone
└── README.md               This guide
```

---

## Turn on the contact form (optional)

The contact form on the Contact page **already works** without any setup: when someone fills it in and clicks send, it opens their email program with a message to **tom@crucible.consulting** ready to go, so nothing is ever lost. The email and LinkedIn links on the page are the main way to get in touch regardless.

If you would prefer messages to arrive automatically without the sender's email program opening:

1. Go to https://formspree.io and create a free form. It will give you a short "form ID".
2. Open `contact.html` in any text editor (or edit it directly on GitHub: open the file and click the pencil icon).
3. Find the line containing `YOUR_FORM_ID` and replace just that part with your form ID. Save (or commit).

That is the only change needed.

---

## Making changes later

- **Easiest:** edit a file directly on GitHub. Open the file in your repository, click the **pencil** icon (top-right of the file), make your change, scroll down, and click **Commit changes**. The live site updates within a minute or two.
- **For bigger edits:** install **GitHub Desktop** (https://desktop.github.com), a free app that lets you edit files on your computer and click a button to publish.
- **Where things live:**
  - **Text and wording** are inside the relevant `.html` file.
  - **Colours and fonts** are at the very top of `css/styles.css`, in the block labelled `01 — Design tokens`. Change a colour value there once and it updates across the whole site. The brand uses its orange accent sparingly on purpose; keep it that way.
  - **The navigation menu and the footer** are repeated in each `.html` file (this is normal for a simple site). To rename or add a menu link, you must change it in **every** page.

---

## Worth reading before you go live: copy to review

Some of the wording on the site was written to match the facts and tone in your brand materials, but was **not** copied word-for-word from them. None of it invents clients, numbers, or quotes. Please read these and adjust the wording to your liking:

- **Headlines and the tagline.** "Forged at the intersection" is used as the recurring line. Page headlines are original ("Operator-grade judgment for deep technology.", "A builder, not a bystander.", "How Crucible works.", "Straight answers.", and the 404's "This page has gone cold.").
- **Home, About, and Services body text**, drawn from your messaging and bio and reworded for the web.
- **The first-person founder note** on the About page ("In his words") is written in your voice from established facts. Swap in your own words if you prefer.
- **All the FAQ questions and answers** are original. Worth a close read.
- **No fees are shown anywhere**, in line with your pricing notes (rates stay off the public site).
- **Government work is described at a high level** ("Senior UK engagement on the life sciences, AI, and sovereign capability"). The specific bodies (for example DSIT, ARIA, HM Treasury) are **not** named, because your notes flagged them for checking. If you want them named, they can be added to the About page and the home "track record" section.

---

## A few notes

- British English throughout, and no em-dashes.
- Built with accessibility in mind: it works without JavaScript, respects "reduce motion" settings, has clear keyboard focus, and the text contrast meets the AA accessibility standard.
- No analytics or trackers are included. You can add your own later if you want them.
