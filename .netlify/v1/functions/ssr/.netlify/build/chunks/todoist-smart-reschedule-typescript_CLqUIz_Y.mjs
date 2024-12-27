import { F as Fragment, _ as __astro_tag_component__, p as createVNode } from './astro/server_COLE3fTq.mjs';
import { $ as $$Image } from './_astro_assets_D6TztbRf.mjs';
import { $ as $$YouTube } from './post_066bZHTl.mjs';
import 'clsx';

const __0_assets_blog_posts_todoist_smart_reschedule_typescript_793303ed8d5e0ba3f04b048ddcc3a8a2c9d9dda5_1290x1566_jpg__ = new Proxy({"src":"/_astro/793303ed8d5e0ba3f04b048ddcc3a8a2c9d9dda5-1290x1566.DUCzx27G.jpg","width":1290,"height":1566,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/rosnovsky/code/rosnovsky.us/src/assets/blog/posts/todoist-smart-reschedule-typescript/793303ed8d5e0ba3f04b048ddcc3a8a2c9d9dda5-1290x1566.jpg";
							}
							
							return target[name];
						}
					});

const frontmatter = {
  "title": "Smart Reschedule: TypeScript?",
  "publishDate": "2020-05-25T00:00:00.000Z",
  "description": "A quick status update, and how I got distracted by TypeScript ♥️",
  "category": "Web Development",
  "image": {
    "src": "@assets/blog/covers/generic.webp",
    "alt": "Generic blog post cover image"
  },
  "minutesRead": "4 min read"
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "next-steps",
    "text": "Next steps"
  }, {
    "depth": 2,
    "slug": "typescript",
    "text": "TypeScript"
  }, {
    "depth": 3,
    "slug": "bonus",
    "text": "Bonus"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    "astro-image": "astro-image",
    code: "code",
    h2: "h2",
    h3: "h3",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  }, _component0 = _components["astro-image"];
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "So, I guess it’s a series now. In our last installment, we walked through the reason behind the project and my vague ideas about how to go about it."
    }), "\n", createVNode(_components.p, {
      children: "​Now, I’ve been tinkering with the project for a little bit and want to share some of my observations and where things stand at the moment."
    }), "\n", createVNode(_components.p, {
      children: "Not much has changed in how I think I will approach task rescheduling. However, I tweaked the parameters a bit. Let me recap:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Task age in days multiplied by -(Task priority) = Reschedule Score: a five-day-old task with a no priority (Task priority:4) gets a score of -20. A two-day-old task with top priority (1) will get a score of -2."
      }), "\n", createVNode(_components.li, {
        children: "Tasks are divided into two groups: overdue and future. Tasks within each group are sorted descending by Reschedule Score: a task with the score of -2 will be ranked higher than a task with a score of -20. I bet there’s a more elegant solution, but for now, this will do."
      }), "\n", createVNode(_components.li, {
        children: "I removed the number of times the task had already been rescheduled before: it’s evident to me now that this data point is not relevant: if a task has been rescheduled 20 times, it doesn’t add anything to its importance (likely, the other way around). For now, I removed it from the equation."
      }), "\n", createVNode(_components.li, {
        children: "Extra data: I decided to also fetch labels and projects from Todoist. I don’t know yet how I’m going to use it exactly (other than showing what task belongs to what project/label). I also decided to fetch my overall Todoist stats (completed tasks, Karma, and so on), so that if I get to create a UI, I have all the data I want to showcase."
      }), "\n"]
    }), "\n", createVNode(_components.h3, {
      id: "next-steps",
      children: "Next steps"
    }), "\n", createVNode(_components.p, {
      children: "Next, I need to figure out how to go about, well, rescheduling tasks. As of this moment, the plan is this:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Figure out a good way to grade future days based on how many tasks they have and how important these tasks are. Maybe, priority multiplied by the number of tasks? I need to figure out a way to reverse priority so that a top priority task weighs more than a low priority. A day with 3 medium priority tasks and 2 top priority tasks will then have a day score of 12. I can set a maximum capacity for a given day of 15 points, so for such a day, I’ll only be able to add one top priority task or 1 medium priority and 1 low priority, or 3 low priority tasks. Not sure it’s smart enough, though 🤔"
      }), "\n", createVNode(_components.li, {
        children: "Figure out the actual rescheduling process. I mean, literally, how do I reschedule tasks using Todoist API? Do I need to specify the due time and date or is the date enough? Can I reschedule tasks relatively, as in “reschedule this 5 days in future if task score fits day’s capacity”?"
      }), "\n", createVNode(_components.li, {
        children: "Do I need a backup? Should I store fetched tasks somewhere just in case?"
      }), "\n", createVNode(_components.li, {
        children: "Is there any existing “science” behind rescheduling stuff?"
      }), "\n"]
    }), "\n", createVNode(_components.h2, {
      id: "typescript",
      children: "TypeScript"
    }), "\n", createVNode(_components.p, {
      children: "I get distracted by shiny new objects really easily. Last night, I came across two fairly old talks on TypeScript:"
    }), "\n", createVNode($$YouTube, {
      id: "AQOEZVG2WY0",
      className: "mx-auto min-w-full"
    }), "\n", createVNode(_components.p, {
      children: "This talk is so old that arrow functions, classes, and string literals had already made their way into JavaScript! In this one, TypeScript 3.8 is announced. We are at 4.0 already!"
    }), "\n", createVNode($$YouTube, {
      id: "jmPZztKIFf4",
      className: "mx-auto min-w-full"
    }), "\n", createVNode(_components.p, {
      children: "As a result, I’ve completely rewritten my little serverless fetchTasks.js in TypeScript. It’s a fantastic low-pressure introduction. Since TypeScript compiles to plain JavaScript, it remains a valid serverless lambda function, while I get to take full advantage of TypeScript: types, amazing IDE support, suggestions, and so on. And since I’m at the ground level of this project, it was really easy to figure out what types and interfaces I need and where I can get the most benefits moving forward."
    }), "\n", createVNode(_components.p, {
      children: "Anyway, stick around if you want to see me stumble around and make this thing happen after all!"
    }), "\n", createVNode(_components.h3, {
      id: "bonus",
      children: "Bonus"
    }), "\n", createVNode(_components.p, {
      children: ["Here’s a sneak peek of what my current function returns. Future tasks are also included. All of this is also sorted by rescheduleScore and ", createVNode(_components.code, {
        children: "importanceScore"
      }), " for past due and future tasks respectively. As you can see, there’s an interesting bug/feature: tasks that are due tomorrow (within a few hours from now) are considered overdue (which is a bug) but receive the highest rescheduleScore (which is a feature). I will fix this later by making sure that tasks with zero days left are not considered overdue 🤷‍♂️"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_component0, {
        alt: "",
        src: __0_assets_blog_posts_todoist_smart_reschedule_typescript_793303ed8d5e0ba3f04b048ddcc3a8a2c9d9dda5_1290x1566_jpg__
      }), "\n​"]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/2020/05/25/todoist-smart-reschedule-typescript.mdx";
const file = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2020/05/25/todoist-smart-reschedule-typescript.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/rosnovsky/code/rosnovsky.us/src/content/blog/2020/05/25/todoist-smart-reschedule-typescript.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
