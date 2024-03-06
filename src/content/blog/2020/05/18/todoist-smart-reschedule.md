---
title: 'Todoist Smart Reschedule'
publishDate: 2020-05-18
description: 'Instead of looking for Todoist alternatives, I decided to implement my own Smart Reschedule feature, which they removed from the app not long ago.'
category: "Web Development"
image:
  src: '@assets/blog/posts/todoist-smart-reschedule/8456d51f10b50af9a5d7a9c83e56a22ba7c00718-2000x1517.jpg'
  alt: 'Generic blog post cover image'
---

I've been sad recently since Todoist removed the Smart Reschedule feature from the application. For me personally, it was one of the most used features. Whenever I get overwhelmed with overdue tasks, usually on Fridays, I'd just hit "Reschedule". Todoist would just move all overdue tasks to the next week, minding their priority, existing daily task load, and so forth. Now that it's gone, my first instinct was to look for a different tool. Unfortunately, there's nothing there that I like enough to switch. And then I thought: wait a second, why can't I implement something like this myself? I mean, there's an [API available from Todoist](https://developer.todoist.com/sync/v8/), I've got my VS Code and some spare time on my hands... So here goes.

> Honestly, I have no idea where it's going or whether something will come of it. I'm just going to document it for the time being and see how it goes.

## Plan

So, Todoist has an API available to developers. There's a bunch of stuff I'll be using, but first and foremost — authentication.

With this out the way, let's move on to the sync endpoint. This endpoint provides us with whatever we're looking for, by resource type (literally, it's called `resource_type`).

[https://developer.todoist.com/sync/v8/](https://developer.todoist.com/sync/v8/)

I can request all tasks right here by specifying `resource_type=["items"]`. Now we are getting somewhere. Here's what a sample item looks like.

```json
{
      "day_order": 3,
      "assigned_by_uid": null,
      "labels": [
        268788653,
        2154348394
      ],
      "sync_id": null,
      "section_id": null,
      "in_history": 0,
      "child_order": 11,
      "date_added": "2020-04-03T20:17:03Z",
      "id": 3794087901,
      "content": "Follow up [REDACTED]",
      "checked": 0,
      "added_by_uid": 536129,
      "user_id": 536129,
      "due": {
        "date": "2020-07-05T20:00:00Z",
        "timezone": "America/Los_Angeles",
        "is_recurring": true,
        "string": "every 1 months at 13:00",
        "lang": "en"
      },
      "priority": 4,
      "parent_id": null,
      "is_deleted": 0,
      "responsible_uid": null,
      "project_id": 2225607519,
      "date_completed": null,
      "collapsed": 0
    },
```

What we need here is the item's priority, due date information, content, date added to figure out the item's age, whether it's deleted or not, and whether it's completed or not. This is the bare minimum, that would allow us to know if we should care about the item (not completed, not deleted), is the item overdue (is the due date in the past), how old the item is, what's its priority and what it's all about.

Just for the sake of argument, here's a basic function to fetch some of this data:

```typescript
// I'm using Netlify Functions so we need to require node-fetch
const fetch = require("node-fetch");

// We don't need the `req` object here, but I was wondering what kind of stuff can I get if I trigger a webhook whenever a task is updated or created. How else could I trigger this function regularly?..

exports.handler = async (req) => {
  const itemsArray = [];
  const data = await fetch(`https://api.todoist.com/sync/v8/sync`, {
    method: "POST",
    body: JSON.stringify({"resource_types": ['items']}),
    headers: { "Authorization": "Bearer ...", "Content-Type": "application/json" }
  })
  const items = await data.json();
  const list = await items.items // don't ask

  const processItems = async (list) => {
	// initially, I wanted to just validate the items and return those I'm concerned about
	const validItems =[];
    const validItemsCheck = list.map(item => {
      if(item.due && item.due.is_recurring === false && Date.now() > new Date(item.due.date).getTime() && ...){
        const itemObject = {
          item: {
            id: item.id,
            content: item.content,
            due: item.due,
            rescheduleScore: item.priority * 10 // magic coeffecient
          },
        }
        validItems.push(itemObject)
      }
    })
    return validItems;
  }

  return ({"body": JSON.stringify({"overdue": await processItems(list)}), "statusCode": 200})
}
```

It's not perfect, but it works. What I get in return is an array of items of interest with some of their metadata. Great start. Let's leave it at that for now.

## What's next

Now that I've got items I'm interested in, time to think about what am I going to do with them.

### Analyze

First, I need to analyze the situation for 10 upcoming days. Why 10? No reason. I need to figure out how many upcoming tasks of each priority I've got on each individual day. This will give me a map of the future. With this information, I'll be able to find out the exact number of free spots and how many tasks of different priorities I can reschedule for each day.

### Process the tasks

I need to check some stuff for my overdue items first.

- **When was the task created?** This point may or may not be important later since it indicates how old the task is. A task I scheduled 2 years ago is probably something important, and I don't want it to slip through the cracks.
- **When was the original due date?** Basically, how long has it been since the task expired? What day of the week was it? I'll try to see if I can reschedule this task to the same day of the week, if possible.
- **What's the original priority?** If the task is important, it gets rescheduled first.
- **Come up with a "score"**. In order to properly prioritize how I reschedule tasks, I will assign them a score. I tried to come up with some sensible way to do this:

![Drawing](assets/blog/posts/todoist-smart-reschedule/8456d51f10b50af9a5d7a9c83e56a22ba7c00718-2000x1517.jpg)

Not sure if any of this makes sense, but what I finally came up with is this:

> Reversed Priority \* (Task age in days + how many times has it been rescheduled)

We'll see if it works or not. For now, I'll stick to this.

I'll post as soon as I get the above working to some extent. Stay tuned.
