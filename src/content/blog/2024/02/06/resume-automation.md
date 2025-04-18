---
title: 'Resume automation'
publishDate: 2024-02-06
description: 'Being recently laid off, I expect to send out hundreds of job applications in coming weeks and months. Why not make working with resume updates as convenient as possible?'
category: 'Web Development'
image:
  src: '@assets/blog/covers/resume.png'
  alt: 'Generic blog post cover image'
---

> On February 1, 2024, I was laid off from Okta. My position at the company was eliminated along with 400 other positions. I'll post about it later; dozens of absolutely incredible people were discarded along with yours truly, and I want to do justice telling our story. If you're interested and inpatient, **Joey deVilla 🪗** had just posted [Laid off in 2024, part 1: The 15 worst minutes of 2024, followed by 15 more](https://www.globalnerdy.com/2024/02/05/laid-off-in-2024-part-1-the-15-worst-minutes-of-2024-followed-by-15-more/), worth reading, I promise!

Anyway.

Applying for jobs sucks, it's no secret, is it? One of the parts that frustrated me in the past was that I need to tweak my resume to highlight skills and experience for a given position. When you only have, like, 2 pages at most to describe everything you have to offer, it's critical that you highlight what matters for a specific job you're applying for.

Given that [last time I was looking for a job in 2019](/blog/new-job-auth0), I've sent out over 100 resumes, I expect to send out hundreds of job applications in coming weeks and months. Why not make working with resume updates as convenient as possible?

So, here's what I came up with when it comes to my _resume workflow_ for this round of job hunting:

- I want an easy way to adjust my resume from anywhere, on any device, in any way I want
- I want to have full version control for the changes I make
- I want the system to _automagically_ organize my resume versions across prospective employers
- I want to have a bit of fun with it, too

## Markdown FTW

Markdown is great. It's easy to write, it's readable to both humans and machines, it's easy to convert to other formats too, and there are a ton of tools to work with it.

So let me write my resume in Markdown.

```markdown
# Art Rosnovsky

## Software Engineer

> job@rosnovsky.us | [github.com/rosnovsky](https://github.com/rosnovsky) | Washington state | **Remote Only** |

Dedicated `JavaScript`/`TypeScript` Engineer with a knack for ` React`, `Kubernetes`, and CI/CD. I champion sustainable, ethical tech that makes a positive impact, by building stable, scalable, efficient, and maintainable software.

## Technical Skills

- **Front End**: `JavaScript`, `TypeScript`, `React`, `Svelte`, `Tailwind`, `CSS`, `HTML`
- **Back End**: `Node.js`, `Express`, `Next.js`, `MongoDB`, `PostgreSQL`, `tRPC`, RESTful APIs
- **Dev Tools/DevOps**: Git, `Docker`, `Kubernetes`, `Jira`, `AWS`, `Azure`, CI/CD (`GitHub Actions`, `Gitlab Pipelines`)
- **Other**: former frontline reporter, can fly single-engine aircraft

[... the rest of the resume ...]
```

## Markdown to PDF

"_Please attach you resume in Markdown format_", said no one ever. So I need to convert my resume to PDF. I mean, I need to convert _every edit_ to PDF. I then need to store this _every edit_ in such a way that I won't mix them up and send the wrong one to a potential employer.

There are many different ways to convert Markdown to PDF. The proper one I should've used is with `pandoc`. But I'm not a proper person, so I went with [md-to-pdf](https://github.com/simonhaenisch/md-to-pdf) package for Node.js: it's just easier to use out-of-the-box.

```typescript
import mdToPdf from 'md-to-pdf';

export const markdownToPdf = async (inputFilePath: string) => {
  try {
    const pdf = await mdToPdf({ path: inputFilePath });
    return pdf;
  } catch (error: any) {
    console.error(`Error occurred: ${error.message}`);
    throw error;
  }
};
```

> If a recruiter asks for a resume in `.docx` or some other exotic/proprietary format, it's a huge red flag. I'll pretend I'm bad at following instructions and send them a PDF anyway.

## Git for version control

Now that I've got my resume in Markdown, converted it to PDF, I need to store it somewhere. Just kidding, it's right there in a folder in the Github repo. I can download the PDF to send it over to someone, or I can just send them a link to the repo (or directly to the `.pdf` file).

I can have branches for every job I'm applying for. I can go back in time to a particular version of the resume that performed better. I can see changes made over time. It's all there, in the repo.

## Fun with it

I'm not doing any of the above by hand. What am I, some caveman?! Github Actions to the rescue! Whenever I push an update to the resume, it triggers a [workflow that converts the resume to PDF](https://github.com/rosnovsky/resume/blob/main/.github/workflows/generate-pdf.yml) and stores it in the repo. It's not perfect (there are quirks preventing me from easily implementing branch protection rules, paths are a bit wonky when it comes to tests, this sort of thing), but it's a start.

```yaml
name: Generate PDF from resume

on:
  push:
    paths:
      # I don't want the workflow to run UNLESS I've updated the actual resume content
      - 'resume.md'
  # I want to be able to trigger the workflow manually, if needed
  workflow_dispatch:
    inputs:
      reason:
        description: 'Re-generate resume PDF'
        required: false
        default: 'Manual trigger'

permissions:
  contents: write

jobs:
  generate-pdf:
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.5.0'

      - name: Install dependencies
        run: npm install -g pnpm && pnpm install

      - name: Generate PDF
        run: pnpm build

      - name: Commit PDF
        run: |
          git config --global user.name "${{ github.actor }}"
          git config --global user.email "${{ github.actor}}@users.noreply.github.com"
          git add output/art_rosnovsky_software_engineer.pdf
          git commit -am "feat: update resume PDF"
          git push
```

## Check it out

I'm sure there are many ways to improve it, and I'd love to hear your thoughts on it.

[![Resume Repo](https://opengraph.githubassets.com/2e5e654555e7ca5ef034846549ecb28fe31bef8f03debe63bf3b5e9ff3123f89/rosnovsky/resume)](https://github.com/rosnovsky/resume)
